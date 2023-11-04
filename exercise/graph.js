class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    for (const node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    const result = [];
    const visited = new Set();

    function dfs(node) {
      if (!node) return;
      visited.add(node);
      result.push(node.value);
      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const result = [];
    const queue = [start];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  hasCycle() {
    const visited = new Set();
    
    function hasCycleDFS(node, parent) {
      visited.add(node);
      for (const neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          if (hasCycleDFS(neighbor, node)) {
            return true;
          }
        } else if (neighbor !== parent) {
          return true;
        }
      }
      return false;
    }

    for (const node of this.nodes) {
      if (!visited.has(node)) {
        if (hasCycleDFS(node, null)) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = { Graph, Node };
