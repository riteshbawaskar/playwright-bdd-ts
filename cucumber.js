export default {
  default: `--require-module ts-node/register             --require ./features/**/*.ts             --require ./features/support/**/*.ts             --format progress             --publish-quiet             --parallel 4             ./features/**/*.feature`
};
