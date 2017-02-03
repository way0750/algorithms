/*
  function to delete a node in a singlely linkedList
   it will take a head and to be deleted node
   return the head node
  linkedList will not come with a wrapper class
   so be careful of deleting the head node

  if head is the same as targetNode then chagne info instead of actually
   deleting just in case other part of the program is still referring to it
  else
   go through the entire list to delete the target node?
   how about just change all the properties of the target node to the next node
   and change the next node's next property to null?

*/

const deleteNode = (head, targetNode) => {
  if (!targetNode) {
    return null;
  }
  const nextNode = targetNode.next;
  targetNode.value = nextNode.value;
  targetNode.next = nextNode.next;
  nextNode.value = null;
  nextNode.next = null;
  return head;
}

const list = { value: 0, next: null };
list.next = { value: 1, next: null };
list.next.next = { value: 2, next: null };
list.next.next.next = { value: 3, next: null };
list.next.next.next.next = { value: 4, next: null };
list.next.next.next.next.next = { value: 5, next: null };

let three = list.next.next.next
deleteNode(list, three)
console.log(JSON.stringify(list));
