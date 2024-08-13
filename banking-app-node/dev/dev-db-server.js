const { spawn } = require('node:child_process');

const NAME = '[mongod]';

const mongod = spawn('mongod', ['--config', './config/mongod.cfg'], { detached: true});

mongod.stdout.on('data', (data) => {
    data = String(data);
    data = data.split(/\r?\n/);
    data.forEach(element => {
        if (element) {
            const jsondata = JSON.parse(element);
            console.log(`${NAME} ${jsondata.msg}`);
        }
    });
});

mongod.stderr.on('data', (data) => {
    console.error(`${NAME} ${data}`);
});

mongod.on('close', (code) => {
    console.log(`${NAME} Exited with code ${code}`);
    process.emit('beforeExit', code);
});

process.on('SIGINT', () => {
    mongod.kill('SIGINT');
});

process.on('beforeExit', (code) => {
    console.log(`${NAME} Server is shutdown succesfully.`);
    process.exit(0);
});