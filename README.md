# STM32 学习任务书

本网站用于整理 STM32 学习过程中的实验任务、
操作步骤和验收要求。

从基础通信开始，逐步学习 STM32 外设开发。

---

## 第一阶段：UART 串口通信

- 任务 01：UART 串口 printf 输出
- 任务 02：UART 中断接收

## 第二阶段：I²C 与 EEPROM

- 任务 03：I²C 设备 ACK 检测
- [任务 04：EEPROM 单字节读写](https://stm32.wz.io/tasks/04-eeprom/)
- [任务 05：EEPROM 多字节读写与页边界处理](https://stm32.wz.io/tasks/05-eeprom-multi-byte)

## 第二阶段：SPI 与 25Q64

- [任务 06：SPI Flash 芯片识别](tasks/06-25q64/)
- [任务 07：SPI Flash 状态寄存器读取与写使能验证](tasks/07-25q64-status-register-write-enable/)


## 后续学习

- GPIO 与外部中断
- 定时器与 PWM
- ADC 数据采集
- DMA 数据传输

---

## 任务书编写模板

- [STM32 实验任务书模板](templates/task-template.md)

新增任务书时，复制模板到 `tasks/`，按实际实验填写内容并命名为 `序号-主题.md`。遵循分阶段操作与验收、失败停止及实际结果验证的要求；发布前删除填写提示和模板使用规则。

持续更新中。
