#!/usr/bin/env node

const ps = require("ps-node");
const pidusage = require("pidusage");
const exec = require("child_process").exec;
const { exit } = require("process");
const argv = process.argv.splice(2);

const command = argv[0];
const cpu = Number(argv[1]) || 85;
const sec = Number(argv[2]) || 30;

console.log({
  command,
  cpu,
  sec,
});

if (!command) {
  console.error("[error] Need input command!");
  exit(0);
}

function killer() {
  console.log("Reload...");
  ps.lookup(
    {
      command,
    },
    function (err, resultList) {
      if (err) {
        throw new Error(err);
      }

      resultList.forEach(function (_process) {
        if (_process) {
          pidusage(_process.pid, (err, stats) => {
            if (stats && stats.cpu > cpu) {
              exec(`kill -9 ${stats.pid}`);
              console.log("Kill A HIGH CPU: ", stats);
            }
          });
        }
      });
    }
  );
}

killer();
setInterval(killer, 1000 * sec);
