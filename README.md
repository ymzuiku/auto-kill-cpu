# auto-kill-cpu

- Macbook M1 芯片，使用 VSCode 编写 Go，常会遇到 有 go 进程一直保持使用 90% 以上 CPU
- 仅测试过 Mac 平台

以下命令表示，监听 go 进程，若 cpu 占有率大于 85，进行移除，每 30 秒排查一次.

```bash
auto-kill-cpu go 85 30
```

```bash
# 若不加参数，默认为 go 85 30
auto-kill-cpu
```
