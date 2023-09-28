const { exec } = require('child_process');

const COUNTRY = `co`;
const ENV = `prod`;
const ACTION = `approve`;

const inputs = ACTION === `create` ? require('./classifications.json') : require(`./${ENV}-${COUNTRY}-class-ids`);

// Function to execute command for each input
function executeCommand(input) {
  const stringJson = JSON.stringify(input);
  const commandCreate = `nu-${COUNTRY} ser curl POST s0 gabyves /api/admin/classifications -d '${stringJson}' --env ${ENV}`;
  const commandApprove = `nu-${COUNTRY} ser curl POST s0 gabyves /api/admin/classifications/'${input.id}/approve' --env ${ENV}`;
  const command = ACTION === `create` ? commandCreate : commandApprove

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`);
      console.error(stderr);
    } else {
      console.log(`Command output for ${command}:`);
      console.log(stdout);
    }
  });
}

// Execute command for each input
inputs.forEach(executeCommand);
