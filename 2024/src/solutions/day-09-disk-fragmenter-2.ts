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

    // Compact files by moving whole files to leftmost free space
    for (let currentFileId = fileId - 1; currentFileId >= 0; currentFileId--) {
      // Find the file's current position and size
      let fileStart = -1;
      let fileSize = 0;
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === currentFileId) {
          if (fileStart === -1) fileStart = i;
          fileSize++;
        }
      }

      // Find leftmost suitable free space
      let bestFreeStart = -1;
      let consecutiveFree = 0;
      for (let i = 0; i < fileStart; i++) {
        if (blocks[i] === -1) {
          if (consecutiveFree === 0) bestFreeStart = i;
          consecutiveFree++;
          if (consecutiveFree === fileSize) break;
        } else {
          consecutiveFree = 0;
          bestFreeStart = -1;
        }
      }

      // Move the file if suitable free space was found
      if (bestFreeStart !== -1 && consecutiveFree >= fileSize) {
        // Copy file to new position
        for (let i = 0; i < fileSize; i++) {
          blocks[bestFreeStart + i] = currentFileId;
        }
        // Clear old position
        for (let i = 0; i < blocks.length; i++) {
          if (blocks[i] === currentFileId && i >= bestFreeStart + fileSize) {
            blocks[i] = -1;
          }
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
