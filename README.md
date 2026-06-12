# LLM Post-Training Field Guide

> A Chinese-first, research-heavy knowledge base for LLM post-training: RLHF, RLVR, preference optimization, reward models, SFT data engineering, agentic RL, evaluation, safety, and training infrastructure.

[![Status](https://img.shields.io/badge/status-active-2ea44f)](#)
[![Language](https://img.shields.io/badge/language-中文%20%2F%20English%20terms-blue)](#)
[![Topic](https://img.shields.io/badge/topic-LLM%20Post--Training-black)](#)

这是一个面向研究、工程和复盘的 LLM 后训练资料库。它不是论文列表，而是一组可直接阅读的长文专题：把算法公式、训练配方、基础设施、评估安全和 2026 前沿动态串成一张地图。

## What Is Inside

| File | Focus |
| --- | --- |
| `llm-post-training-master.html` | 全景主线：从 RLHF 到 Agentic RL 的后训练演化 |
| `derivations.html` | 核心推导：Policy Gradient、PPO、GRPO、DPO、KL 估计器 |
| `sft-data-engineering.html` | SFT、蒸馏、mid-training、合成数据、去污染 |
| `reward-models.html` | Bradley-Terry、PRM/ORM、GenRM、rubric reward、judge 偏置 |
| `multi-turn-tool-use.html` | 多轮工具使用、Agentic RL、turn-level credit assignment |
| `rl-frameworks-survey.html` | RLHF/RL 训练框架、rollout/训练解耦、MoE routing mismatch |
| `rl-pitfalls-survey.html` | 实战坑点：熵塌缩、reward hacking、KL、长度偏置、训推失配 |
| `eval-safety.html` | 评估污染、安全后训练、emergent misalignment、CoT monitorability |
| `frontier-recipes-2026.html` | 2026 旗舰模型后训练配方对照 |
| `zh-llm-post-training-resources.html` | 中文社区 LLM post-training/RL 精华资源综述 |
| `audit-report-2026-06.md` | 2026-06 知识库审计报告与缺口清单 |

## Reading Paths

| Goal | Start Here |
| --- | --- |
| 快速建立全局框架 | `llm-post-training-master.html` |
| 补齐 RL / preference optimization 数学细节 | `derivations.html` |
| 做 SFT、蒸馏或数据配方 | `sft-data-engineering.html` |
| 选 reward model / judge 方案 | `reward-models.html` |
| 训练 tool-use 或 agentic 模型 | `multi-turn-tool-use.html` |
| 搭 RL 训练系统或排查训推失配 | `rl-frameworks-survey.html` + `rl-pitfalls-survey.html` |
| 做 benchmark、安全和污染审计 | `eval-safety.html` + `audit-report-2026-06.md` |

## Local Preview

```bash
python3 -m http.server 8000
```

Open:

```text
http://127.0.0.1:8000/llm-post-training-master.html
```

## Scope

- Focus: post-training after base model pretraining.
- Format: standalone HTML essays plus one Markdown audit report.
- Audience: researchers, applied ML engineers, and builders maintaining LLM training/evaluation pipelines.
- Snapshot: materials are written around the 2024-2026 post-training literature and engineering ecosystem.

## Repository Layout

```text
.
├── llm-post-training-master.html
├── derivations.html
├── sft-data-engineering.html
├── reward-models.html
├── multi-turn-tool-use.html
├── rl-frameworks-survey.html
├── rl-pitfalls-survey.html
├── eval-safety.html
├── frontier-recipes-2026.html
├── zh-llm-post-training-resources.html
└── audit-report-2026-06.md
```
