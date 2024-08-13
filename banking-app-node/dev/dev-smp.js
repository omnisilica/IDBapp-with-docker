const { spawn } = require("node:child_process");
const EventEmitter = require("node:events");

const NAME = `[dev-smp]`;
const usage = `${NAME} usage: dev-smp "program"`;
const eventEmitter = new EventEmitter();

const fs = require("fs");
const path = require("path");
// Define the base directory one level up
const baseDir = path.resolve(__dirname, "..");

// Check if 'data' directory exists
if (!fs.existsSync(path.join(baseDir, "data"))) {
  // If not, create it
  fs.mkdirSync(path.join(baseDir, "data"));
}

// Check if 'data/db' directory exists
if (!fs.existsSync(path.join(baseDir, "data", "db"))) {
  // If not, create it
  fs.mkdirSync(path.join(baseDir, "data", "db"));
}

// Check if 'data/log' directory exists
if (!fs.existsSync(path.join(baseDir, "data", "logs"))) {
  // If not, create it
  fs.mkdirSync(path.join(baseDir, "data", "logs"));
}
// just windows things lel, the reason is windows supports some signals, particularly sigint works
// however windows immediately terminates the process and the process cannot intervene and finish gracefully
if (process.platform === "win32") {
  // the lines below doesn't intercept a SIGINT signal
  // it instead intercepts a CTL+C input on stdin instead
  const rl = require("readline").createInterface({
    input: process.stdin,
  });

  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

// basic error checking
function checkArgsIntegrety(args) {
  if (!(args.length === 2)) {
    console.error(`${usage}\nCan only run two commands`);
    process.exit(1);
  }

  if (!(typeof args[0] === "string" && typeof args[1] === "string")) {
    console.error(
      `${usage}\nPlease make sure the commands are in string format`
    );
    process.exit(1);
  }
}

// break down given command strings into a format that we can use in fork()
function getComands(args) {
  const commands = [];

  args.forEach((arg) => {
    const split = arg.split(" ");
    const program = split[0];
    const args = split.slice(1);
    const command = {
      p: program,
      args: args,
    };
    commands.push(command);
  });

  return commands;
}

function bufferToSting(name, data) {
  // normalize strings and accumulate into a single variable to format later
  let stringArray = data.toString().replace(/\n\r/g, "").split("\n");
  let accumulator = "";
  stringArray.forEach((element) => {
    accumulator += `${element.replace(/\r/, "\n")}`;
  });
  let processedString = `${
    name == "node" ? "[" + name + "]" : "[" + name + "] "
  }${accumulator}`;
  // TODO: extra processing for specific program's I/O streams goes here, for now just mongod

  return processedString;
}

const args = process.argv.slice(2);
//checkArgsIntegrety(args);
const commands = getComands(args);

// collect spawned processes
let processes = [];
// set stdio piping for child processes to interact with its stdout and stderr
// file descriptors
const pipes = ["ignore", "pipe", "pipe", "ipc"];
// begin excecution of the two commands in child processes
commands.forEach((command, index) => {
  const childProcess = spawn(command.p, command.args, { stdio: pipes });
  processes.push(childProcess);

  childProcess.stdout.on("data", (data) => {
    //data shows up as a buffer, handle for clean stdout
    console.log(bufferToSting(command.p, data));
  });

  childProcess.stderr.on("data", (data) => {
    console.error(bufferToSting(command.p, data));
  });

  childProcess.on("exit", (code) => {
    // On process exit report the exit code
    console.log(
      `${NAME} program '${command.p}' closed with exit code ${code}.`
    );
    // emit an event to check if the main process should stop, potentially should use a different
    processes = processes.filter(
      (processes_c) => processes_c.pid !== childProcess.pid
    );
    eventEmitter.emit("process-exited", childProcess);
  });
});

// when Ctrl+C (or SIGINT) signal is recieved shut down
// both process with the same signal
process.on("SIGINT", () => {
  console.log(`${NAME} Keyboard intrupt recieved shutting down all processes`);
  eventEmitter.emit("shutdown-started");
});

eventEmitter.on("shutdown-started", () => {
  if (processes.length !== 0) {
    processes.forEach((process_c) => {
      console.log(
        `${NAME} Attempting to close runnign program ${process_c.spawnargs[0]}`
      );
      process_c.emit("SIGINT");
      // if process didn't respond to the event send a kill signal
      setTimeout(() => {
        if (!process_c.exitCode) process.kill(process_c.pid);
      }, 1000);
    });
  }
});

// check that there are no more programs running, if not
// start the start down process of the ones that are open
eventEmitter.on("process-exited", () => {
  if (processes.length === 0) {
    console.log(`${NAME} All programs have stopped.`);
    process.exit(0);
  } else {
    eventEmitter.emit("shutdown-started");
  }
});

process.on("exit", () => {
  console.log(`${NAME} Goodbye!`);
});
