1. запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
books> db.books.insertMany([{title:"1",description:"2",authors:"3"},{title:"4",description:"5",authors:"6"}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("63668da51bd17b7aea71b9b0"),
    '1': ObjectId("63669161619fccdfc314bfdc")
  }
}

2. запрос для поиска полей документов коллекции books по полю title
books> db.books.find({title:"4"})
[
  {
    _id: ObjectId("63669161619fccdfc314bfdc"),
    title: '4',
    description: '5',
    authors: '6'
  }
]

3. Запрос для редактирования полей: description и authors коллекции books по _id записи
db.books.updateOne({_id:ObjectId("63669161619fccdfc314bfdc")}, {$set: {description:"2", $authors:"3"}})

db.books.find({title:"4"})
[
  {
    _id: ObjectId("63669161619fccdfc314bfdc"),
    title: '4',
    description: '2',
    authors: '3'
  }
]