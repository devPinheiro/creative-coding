const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 60
};

const sketch = ({ canvas }) => {
  // Game state
  let player1 = {
    x: 0,
    y: 0,
    health: 100,
    isAttacking: false,
    direction: 1
  };
  
  let player2 = {
    x: 0,
    y: 0,
    health: 100,
    isAttacking: false,
    direction: -1
  };

  // Add keyboard controls
  const keys = {};
  window.addEventListener('keydown', (e) => keys[e.key] = true);
  window.addEventListener('keyup', (e) => keys[e.key] = false);

  const drawStickman = (context, player) => {
    context.strokeStyle = player.isAttacking ? 'red' : (player.health > 30 ? 'black' : '#ff4444');
    context.lineWidth = 8;
    context.lineCap = 'round';
    
    // Health bar
    context.fillStyle = 'red';
    context.fillRect(player.x - 30, player.y - 80, 60, 10);
    context.fillStyle = 'green';
    context.fillRect(player.x - 30, player.y - 80, (player.health / 100) * 60, 10);
    
    // Head
    context.beginPath();
    context.arc(player.x, player.y - 40, 20, 0, Math.PI * 2);
    context.stroke();
    
    // Body
    context.beginPath();
    context.moveTo(player.x, player.y - 20);
    context.lineTo(player.x, player.y + 40);
    context.stroke();
    
    // Arms with attack animation
    if (player.isAttacking) {
      context.beginPath();
      const punchX = player.x + (player.direction * 60);
      context.moveTo(player.x, player.y);
      context.lineTo(punchX, player.y);
      context.stroke();
      
      // Check hit collision
      const otherPlayer = player === player1 ? player2 : player1;
      if (Math.abs(punchX - otherPlayer.x) < 30 && Math.abs(player.y - otherPlayer.y) < 40) {
        otherPlayer.health = Math.max(0, otherPlayer.health - 1);
      }
    } else {
      // Normal arms
      const time = Date.now() * 0.001;
      const armAngle = Math.sin(time * 2) * 0.3;
      context.beginPath();
      context.moveTo(player.x, player.y);
      context.lineTo(player.x + Math.cos(armAngle) * 40, player.y - Math.sin(armAngle) * 40);
      context.moveTo(player.x, player.y);
      context.lineTo(player.x - Math.cos(armAngle) * 40, player.y - Math.sin(armAngle) * 40);
      context.stroke();
    }
    
    // Legs
    const legAngle = Math.sin(Date.now() * 0.002) * 0.3;
    context.beginPath();
    context.moveTo(player.x, player.y + 40);
    context.lineTo(player.x + Math.cos(legAngle) * 40, player.y + 40 + Math.sin(legAngle) * 40);
    context.moveTo(player.x, player.y + 40);
    context.lineTo(player.x - Math.cos(legAngle) * 40, player.y + 40 + Math.sin(legAngle) * 40);
    context.stroke();
  };

  return ({ context, width, height }) => {
    // Clear background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    // Update player positions
    player1.x = width * 0.63;
    player1.y = height * 0.5;
    player2.x = width * 0.7;
    player2.y = height * 0.5;
    
    // Handle controls
    player1.isAttacking = keys['a'] || keys['A'];
    player2.isAttacking = keys['l'] || keys['L'];
    
    // Draw instructions
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Player 1: Press A to attack', 20, 30);
    context.fillText('Player 2: Press L to attack', width - 250, 30);
    
    // Draw players
    drawStickman(context, player1);
    drawStickman(context, player2);
    
    // Game over check
    if (player1.health <= 0 || player2.health <= 0) {
      context.fillStyle = 'red';
      context.font = '48px Arial';
      const winner = player1.health <= 0 ? 'Player 2' : 'Player 1';
      context.fillText(`${winner} Wins!`, width/2 - 100, height/2);
    }
  };
};

canvasSketch(sketch, settings);