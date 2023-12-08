import { Solution, spreadMap, sum } from "../utils"

class File {
  name: string
  size: number

  constructor(name: string, size: number) {
    this.name = name
    this.size = size
  }
}

class Directory {
  name: string
  parent: Directory | null
  children: Map<string, Directory> = new Map()
  files: Map<string, File> = new Map()
  private cached_size: number = -1
  constructor(name: string, parent: Directory | null) {
    this.name = name
    this.parent = parent
  }

  handleCd(dirname: string): Directory | null {
    if (dirname == "..") {
      if (this.parent) {
        return this.parent
      } else {
        return this
      }
    } else if (dirname == "/") {
      let parent: Directory | null = this
      while (parent?.parent) {
        parent = parent.parent
      }
      return parent
    } else {
      let child = this.children.get(dirname)
      if (child) {
        return child
      } else {
        let newChild = new Directory(dirname, this)
        this.addDirectory(newChild)
        return newChild
      }
    }
  }

  addDirectory(directory: Directory) {
    this.children.set(directory.name, directory)
  }

  addFile(file: File) {
    this.files.set(file.name, file)
  }

  print(level = 1) {
    console.log("-".repeat(level), this.name, "(dir)", "[", this.getSize(), "]")
    this.files.forEach((value) => {
      console.log(
        "-".repeat(level + 1),
        value.name,
        "(file, size=",
        value.size,
        ")",
      )
    })
    this.children.forEach((value) => {
      value.print(level + 1)
    })
  }

  getSize(): number {
    if (this.cached_size != -1) {
      return this.cached_size
    }
    let totalSize = 0
    this.files.forEach((file) => (totalSize += file.size))

    this.children.forEach((dir) => (totalSize += dir.getSize()))

    this.cached_size = totalSize

    return totalSize
  }

  getCandidates(threshold: number): Directory[] {
    let result: Directory[] = []
    spreadMap(this.children).forEach((child) => {
      if (child.getSize() < threshold) {
        result.push(child)
      }
      result.push(...child.getCandidates(threshold))
    })

    return result
  }
}

export default class NoSpaceLeftOnDevice extends Solution {
  rootDirectory: Directory = new Directory("/", null)

  solve(input: string) {
    let commands = this.get_lines(input).map((line) => line.split(" "))
    // .map(pipelog)

    let runningDirectory: Directory | null | undefined = this.rootDirectory

    for (let index = 0; index < commands.length; index++) {
      const command = commands[index]

      if (command[0] == "$") {
        if (command[1] == "cd") {
          // console.log(command)
          runningDirectory = runningDirectory?.handleCd(command[2])
        }
      } else {
        let size = parseInt(command[0])

        if (!isNaN(size)) {
          // must be a file
          runningDirectory?.addFile(new File(command[1], size))
        }
      }
    }

    // this.rootDirectory.print()

    // return [...this.rootDirectory.children]
    //     .map(value => value[1].getSize())
    //     .reduce((previous, next) => Math.max(previous, next))

    // spreadMap(this.rootDirectory.children).map(child => child.name).map(pipelog)

    return this.rootDirectory
      .getCandidates(100000)
      .map((dir) => dir.getSize())
      .reduce(sum)
  }
}
