# DEBUGGING DOCUMENTATION | 2026-1-28 | EXPLICIT VERSION

## DEBUG Mode:
` LEXI_DEBUG=1,0 `
Values:
- `1` : Enable DEBUG Mode
- `0` : Disable DEBUG Mode

### PATH Mode
` PATH_MODE=long,relative,short`
Values:
- `long` : Print absolute Path.
- `relative` : Print Relative Path to project root.
- `short` : Print Filename only. (DEFAULT)

OutPut in order of Values:
- /home/user/project/main/main.js
- project_root/main/main.js
- main.js

You could always change the Default PATH_MODE using **DEFAULT_PATH_MODE**. This will override the PATH_MODE environment variable default value. You can find the set value in the lexi/.lexitoolrc.json file.


1. Implement a DEFAULT before any environment variable.

2. Implement so the config file controls the default PATH_MODE.

3. Create a DEFAULT_PATH_MODE variable in the lexi/.lexitoolrc.json file to set the default PATH_MODE. For example:
```
{
  "DEFAULT_PATH_MODE": "full"
}
```

4. Implement a registry file to store the PATH_MODE value.