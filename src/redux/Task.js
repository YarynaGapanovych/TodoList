export function Task(description) {
  this.id = '_' + Math.random().toString(36).substring(2, 9)
  this.description = description
  this.completed = false
  this.important = false
  this.delitionIsLoading = false
}