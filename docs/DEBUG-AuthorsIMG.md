# DEBUGGING DOCUMENTATION | 2026-1-28 | AUTHORS IMAGE VERSION

## DEBUG Mode:
` LEXI_DEBUG=1,0 <flags>`
Values:
- `1` : Enable DEBUG Mode
- `0` : Disable DEBUG Mode

## Flags
### PATH MODES
`--full` : Print full File Path in which script is executed.


## Developers Note
This works well only when:
1. The logger is app-local, not a reusable library or module. I control how it is used.
2. DEBUG is a developer-only feature. No CI, no production log parsing, no external consumers.
3. Modifiers are rare and situational. You only want full paths when actively chasing something.