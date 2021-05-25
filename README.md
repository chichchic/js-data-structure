# js-data-structure

## LinkedNode(양방향 노드)

### 생성 방법

> Object.create(LinkedNode).init({prev, next, data})

*parameters*

prev (default: null): 새로 만든 노드와 연결된 이전 노드.

next (default: null): 새로 만든 노드와 연결된 다음 노드.

data (default: null): 새로 만든 노드의 값

*return*

새로운 LinkedNode 객체

## DoublyLinkedList(양방향 연결 리스트)

### 생성 방법

> Object.create(DoublyLinkedList).init()

*return*

새로운 DoublyLinkedList 객체

### Method

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

- *DoublyLinkedList.prototype.popFront()

DoublyLinkedList 객체에서 첫 번째 노드를 삭제하고 true를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

- *DoublyLinkedList.prototype.popBack()

DoublyLinkedList 객체에서 마지막 노드를 삭제하고 true를 반환합니다. 만약, 비어있을 경우 false를 반환합니다.

