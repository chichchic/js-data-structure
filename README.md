# js-data-structure

## LinkedNode(양방향 노드)

### 생성 방법

> Object.create(LinkedNode).init({prev, next, data})

*parameters*

- prev (default: null): 새로 만든 노드와 연결된 이전 노드.

- next (default: null): 새로 만든 노드와 연결된 다음 노드.

- data (default: null): 새로 만든 노드의 값

*return*

새로운 LinkedNode 객체

## BinaryNode(양방향 노드)

### 생성 방법

> Object.create(BinaryNode).init({parent, left, right, data})

*parameters*

- parent(default: null): 새로 만든 노드와 연결된 부모 노드.
- left(default: null): 새로 만든 노드와 연결된 왼쪽 노드.
- right (default: null): 새로 만든 노드와 연결된 오른쪽 노드.
- data (default: null): 새로 만든 노드의 값

*return*

새로운 BinaryNode 객체

## DoublyLinkedList(양방향 연결 리스트)

### 생성 방법

> Object.create(DoublyLinkedList).init()

*return*

새로운 DoublyLinkedList 객체

### Method

- *DoublyLinkedList.prototype.size()*

DoublyLinkedList 객체가 가지고 있는 노드의 개수를 반환합니다.

- *DoublyLinkedList.prototype.isEmpty()*

DoublyLinkedList 객체가 비어있으면 true, 아니면 false를 반환합니다.

- *DoublyLinkedList.prototype.has(target)*

DoublyLinkedList 객체에 target과 일치하는 노드 또는 노드의 값이 있을 경우 true, 아니면 false를 반환합니다.

- *DoublyLinkedList.prototype.front()*

DoublyLinkedList 객체의 첫번째 노드를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.back()*

DoublyLinkedList 객체의 마지막 노드를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.pushPrev(target, data)*

target 이전에 data 값을 가진 노드를 추가하고 true를 반환합니다. 만약, target이 LinkedNode가 아니거나 DoublyLinkedList 객체에 target값이 없을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.pushNext(target, data)*

target 다음에 data 값을 가진 노드를 추가하고 true를 반환합니다. 만약, target이 LinkedNode가 아니거나 DoublyLinkedList 객체에 target값이 없을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.pushFront(data)*

DoublyLinkedList 객체 앞에 data값을 가진 노드를 추가하고 true를 반환합니다.

- *DoublyLinkedList.prototype.pushBack(data)*

DoublyLinkedList 객체 마지막에 data값을 가진 노드를 추가하고 true를 반환합니다.

- *DoublyLinkedList.prototype.erase(target)*

DoublyLinkedList 객체에서 target를 삭제합니다. 만약, target이 LinkedNode가 아니거나 DoublyLinkedList 객체에 target값이 없을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.popFront()*

DoublyLinkedList 객체에서 첫 번째 노드를 삭제하고 true를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.popBack()*

DoublyLinkedList 객체에서 마지막 노드를 삭제하고 true를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

## Stack(스택)

### 생성 방법

> Object.create(Stack).init()

*return*

새로운 Stack객체

### Method

- *Stack.prototype.size()*

Stack 객체가 가지고 있는 노드의 개수를 반환합니다.

- *Stack.prototype.isEmpty()*

Stack 객체가 비어있으면 true, 아니면 false를 반환합니다.

- *Stack.prototype.top()*

Stack 객체의 가장 상단에 있는 노드를 반환합니다. 만약 객체가 비어있을 경우 false를 반환합니다.

- *Stack.prototype.push(data)*

Stack 객체의 가장 상단에 data값을 가진 노드를 추가하고 true를 반환합니다.

- *Stack.prototype.pop()*

Stack 객체의 가장 상단에 있는 노드를 제거하고 true를 반환합니다. 만약 객체가 비어있을 경우 false를 반환합니다.

## Queue(큐)

DoublyLinkedList를 사용해 만들어진 자료구조로, DoublyLinkedList가 가진 모든 메소드를 사용할 수 있습니다.

### 생성 방법

> Object.create(Queue).init()

*return*

새로운 Queue 객체

### Method

- *Queue.prototype.push(data)*

Queue 객체 뒤에 data값을 가진 노드를 추가하고 true를 반환합니다.

- *Queue.prototype.pop()*

Queue 객체 가장 앞에 위치한 노드를 제거하고 true를 반환합니다. 만약 객체가 비어있을 경우 false를 반환합니다.

## Heap(힙)

### 생성 방법

> Object.create(Heap).init({compareFunc*})

*parameter*

- compareFunc(*): 정렬 순서를 결정하는데 사용되는 Boolean 반환값을 가지는 함수.

*return*

새로운 Heap 객체

### Method

- *Heap.prototype.top()*

Heap 객체 가장 앞에 위치한 값을 반환합니다.

- *Heap.prototype.isEmpty()*

Heap 객체가 비어있으면 true, 아니면 false를 반환합니다.

- *Heap.prototype.size()*

Heap 객체가 가지고 있는 값의 수를 반환합니다.

- *Heap.prototype.push(data)*

Heap 객체에 새로운 값을 삽입합니다.

- *Heap.prototype.pop()*

Heap 객체 가장 앞에 위치한 값을 제거합니다. 만약, 객체가 비어있을 경우 false를 반환합니다.

## RedBlackTree(레드 블랙 트리)

### 생성 방법

> Object.create(RedBlackTree).init({compareFunc*})

*parameter*

- compareFunc(*): 정렬 순서를 결정하는데 사용되는 Boolean 반환값을 가지는 함수.

*return*

새로운 RedBlackTree객체

### Method

- *RedBlackTree.prototype.isEmpty()*

RedBlackTree 객체가 비어있으면 true, 아니면 false를 반환합니다.

- *RedBlackTree.prototype.size()*

RedBlackTree 객체가 가지고 있는 노드의 수를 반환합니다.

- *RedBlackTree.prototype.has(data)*

RedBlackTree 객체가 data값을 가지고 있을 경우 true, 아닐 경우 false를 반환합니다.

- *RedBlackTree.prototype.find(data)*

RedBlackTree 객체가 data를 가지고 있을경우 해당 노드를, 아닐 경우 false를 반환합니다.

- *RedBlackTree.prototype.print()*

RedBlackTree 객체가 가지고 있는 노드의 값을 순서대로 배열에 담아 반환합니다. 만약, 객체가 비어있을 경우 false를 반환합니다.

- *RedBlackTree.prototype.insert(data)*

RedBlackTree에 data값을 삽입하고 true를 반환합니다.

- *RedBlackTree.prototype.remove(node)*

 RedBlackTree가 가지고 있는 해당 node를 삭제하고 true를 반환합니다.

