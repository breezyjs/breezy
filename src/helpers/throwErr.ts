export default function throwErr(msg: string, exitCode = 1) {
  console.error(msg);
  process.exit(exitCode);
}
