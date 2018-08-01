const program = require("commander");
const nodeVm = require("vm");
const Babel = require("@babel/standalone");
let sandbox = {};
nodeVm.createContext(sandbox);
const getTranspiledCode = code => {
  return Babel.transform(code, { presets: ["es2015"] }).code;
};

program.version("1.0.0").description("Javscript Command Line Tool");

program
  .command("execute <code>")
  .alias("e")
  .description("Execute something")
  .action(code => {
    try {
      let result = nodeVm.runInContext(`${getTranspiledCode(code)}`, sandbox);
      result = !result
        ? `Executed with context ${JSON.stringify(sandbox)}`
        : result;
      console.log(result);
    } catch (e) {
      console.log("Don't know!!!Looks like something errored out");
    }
  });
program
  .command("help")
  .alias("h")
  .description("Help")
  .action(() => {
    console.log(`
    This is a command line utility to execute javsacript

     Example
     -------
     js "Date.now()"

     1533099428679
    `);
  });
program.parse(process.argv);
