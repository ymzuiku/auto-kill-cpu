#!/usr/bin/env node

const ps = require("ps-node");
const pidusage = require("pidusage");
const exec = require("child_process").exec;
const argv = process.argv.splice(2);

const command = argv[1] || "go";
const cpu = Number(argv[2]) || 85;
const sec = Number(argv[3]) || 60;

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
