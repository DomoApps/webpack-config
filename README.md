[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# webpack-config (DEPRECATED)

A Webpack 2.0 config to be used in conjunction with [generator-da](https://git.empdev.domo.com/AppTeam6-Lib/generator-da)

## Available aliases

These can be used when importing or requiring modules instead of a relative or absoulte path

- actions => `src/actions`
- components => `src/components`
- styles => `src/styles`
- ~ => `src`

Example:

```
// before
import TestComponent from '../../components/test-component';

// after
import TestComponent from 'components/test-component';
```
