# Solidity 函数调用

### **课程目标：**

1. 理解 Solidity 中函数的定义、参数、返回值、可见性和状态可变性。
2. 掌握函数参数和返回值的使用方法，包括多值返回和元组操作。
3. 学习并区分 Solidity 中四种函数可见性修饰符及三种状态可变性修饰符的用法。
4. 通过实际代码示例，巩固函数在智能合约中的应用。

#### **课程内容：**

---

#### **第一节：函数的基本定义**

- **函数定义语法**：
  - 在 Solidity 中，函数的定义形式如下：

```solidity
function 函数名(< 参数类型 > < 参数名 >) < 可见性 > < 状态可变性 > [returns(< 返回类型 >)] {
// 函数体
}

```
- 函数可以包含输入参数、输出参数、可见性修饰符、状态可变性修饰符和返回类型。

- **自由函数**：
	- 函数不仅可以在合约内部定义，还可以作为自由函数在合约外部定义。
	- 自由函数的使用可以帮助分离业务逻辑，使代码更具模块化。

---

#### **第二节：函数参数的使用**

- **参数声明**：
	- 函数参数与变量声明类似，输入参数用于接收调用时传入的值，输出参数用于返回结果。
	- 未使用的参数可以省略其名称。
	- 示例代码：
```solidity
pragma solidity >0.5.0;

contract Simple {
    function taker(uint _a, uint _b) public pure {
        // 使用 _a 和 _b 进行运算
    }
}
```

- **返回值**：
  - Solidity 函数可以返回多个值，这通过元组（tuple）来实现。
  - 返回值可以通过两种方式指定：
  - **使用返回变量名**：

```solidity
function arithmetic(uint _a, uint _b) public pure returns (uint o_sum, uint o_product) {
o_sum = _a + _b;
o_product = _a * _b;
}

```
- **直接在****return****语句中提供返回值**：
```solidity
function arithmetic(uint _a, uint _b) public pure returns (uint o_sum, uint o_product) {
    return (_a + _b, _a * _b);
}
```

- **元组与多值返回**：
  - Solidity 支持通过元组返回多个值，并且可以同时将这些值赋给多个变量。
  - 示例代码：

```solidity
pragma solidity >0.5.0;

contract C {
function f() public pure returns (uint, bool, uint) {
return (7, true, 2);
}

function g() public {
    (uint x, bool b, uint y) = f();  // 多值赋值
}
}

```

---

#### **第三节：函数可见性修饰符**
- Solidity中的函数可见性修饰符有四种，决定了函数在何处可以被访问：
	1. **private** **（私有）**：
		- 只能在定义该函数的合约内部调用。
	2. **internal** **（内部）**：
		- 可在定义该函数的合约内部调用，也可从继承该合约的子合约中调用。
	3. **external** **（外部）**：
		- 只能从合约外部调用。如果需要从合约内部调用，必须使用`this`关键字。
	4. **public** **（公开）**：
		- 可以从任何地方调用，包括合约内部、继承合约和合约外部。

- **示例代码**： 

```solidity
contract VisibilityExample {
    function privateFunction() private pure returns (string memory) {
        return "Private";
    }
    
    function internalFunction() internal pure returns (string memory) {
        return "Internal";
    }
    
    function externalFunction() external pure returns (string memory) {
        return "External";
    }
    
    function publicFunction() public pure returns (string memory) {
        return "Public";
    }
}
```

---

#### **第四节：状态可变性修饰符**

- **状态可变性修饰符**：
  - Solidity 中有三种状态可变性修饰符，用于描述函数是否会修改区块链上的状态：
  - **view**：
    - 声明函数只能读取状态变量，不能修改状态。
    - 示例：

```solidity
function getData() external view returns(uint256) {
return data;
}

```
- **pure**：
	- 声明函数既不能读取也不能修改状态变量，通常用于执行纯计算。
	- 示例：
		
```solidity
function add(uint _a, uint _b) public pure returns (uint) {
    return _a + _b;
}
```

- **payable**：
	- 声明函数可以接受以太币，如果没有该修饰符，函数将拒绝任何发送到它的以太币。
	- 示例：
```solidity
function deposit() external payable {
// 接收以太币
}

```

- **完整示例**： 

```solidity
contract SimpleStorage {
    uint256 private data;

    function setData(uint256 _data) external {
        data = _data;  // 修改状态变量
    }

    function getData() external view returns (uint256) {
        return data;  // 读取状态变量
    }

    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;  // 纯计算函数
    }

    function deposit() external payable {
        // 接收以太币
    }
}
```