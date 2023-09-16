import { expect, test } from "bun:test"

// 成功测试用例
test("1 + 1", () => {
  expect(1 + 1).toBe(2);
})

// 失败测试用例
test("1 + 2", () => {
  expect(1 + 2).toBe(4);
})
