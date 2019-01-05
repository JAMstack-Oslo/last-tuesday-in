const { Command, flags } = require("@oclif/command");

// https://stackoverflow.com/questions/25588473/how-to-get-list-of-days-in-a-month-with-moment-js
const lastTuesdayIn = (year, month) => {
  const names = Object.freeze(["s", "m", "Tuesday", "w", "t", "f", "s"]);
  const date = new Date(year, month - 1, 1);
  const tuesdays = [];
  while (date.getMonth() == month - 1) {
    if (names[date.getDay()] === "Tuesday") {
      tuesdays.push(date.toLocaleDateString());
    }
    date.setDate(date.getDate() + 1);
  }
  if (!tuesdays || tuesdays.length == 0) {
    return undefined;
  }
  return tuesdays[tuesdays.length - 1];
};

class JamstackOsloLastTuesdayInCommand extends Command {
  async run() {
    const { flags } = this.parse(JamstackOsloLastTuesdayInCommand);
    const today = new Date();
    const year = flags.year || today.getUTCFullYear();
    const month = flags.month || today.getUTCMonth() + 1;
    const remainder = flags.remainder || false;

    if (remainder) {
      for (let i = month; i <= 12; i++) {
        this.log(lastTuesdayIn(year, i));
      }
    } else {
      this.log(lastTuesdayIn(year, month));
    }
  }
}

JamstackOsloLastTuesdayInCommand.description = `Print out the last tuesdays
Running without arguments will default ot the current year and month.`;

JamstackOsloLastTuesdayInCommand.flags = {
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" }),
  month: flags.integer({ char: "m", description: "month for filter" }),
  year: flags.integer({ char: "y", description: "year for filter" }),
  remainder: flags.boolean({
    char: "r",
    description: "print all last remaining tuesdays"
  })
};

module.exports = JamstackOsloLastTuesdayInCommand;
