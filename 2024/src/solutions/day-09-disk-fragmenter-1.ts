import { Solution } from "#/utils";

export default class DiskFragmenter extends Solution {
  solve(input: string) {
    const diskMap = input.trim();
    const blocks: number[] = [];
    let fileId = 0;

    // Parse disk map into blocks with file IDs
    for (let i = 0; i < diskMap.length; i++) {
      const length = parseInt(diskMap[i]);
      if (i % 2 === 0) {
        // File blocks
        for (let j = 0; j < length; j++) {
          blocks.push(fileId);
        }
        fileId++;
      } else {
        // Free space blocks
        for (let j = 0; j < length; j++) {
          blocks.push(-1);
        }
      }
    }

    // Compact files by moving them to leftmost free space
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i] !== -1) {
        let freeSpacePos = -1;
        for (let j = 0; j < i; j++) {
          if (blocks[j] === -1) {
            freeSpacePos = j;
            break;
          }
        }
        if (freeSpacePos !== -1) {
          blocks[freeSpacePos] = blocks[i];
          blocks[i] = -1;
        }
      }
    }

    // Calculate checksum
    let checksum = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== -1) {
        checksum += i * blocks[i];
      }
    }

    return checksum;
  }
}
