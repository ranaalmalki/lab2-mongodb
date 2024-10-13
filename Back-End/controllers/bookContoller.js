import Book from "../models/book.js";


export const addBook = async (req, res) => {
  try{
    const user = await User.findById(req.user.id);
    if(!user){
return res.status(404).json({ message: 'User not found' });           }

 const book = new Book({
     Book_title:req.body.Book_title,
     Author: user._id,
     Edition_number: req.body.Edition_number,
     Publisher: req.body.Publisher,
     electronic_version:req.body.electronic_version,
     price: req.body.price,
     languages_supported: req.body.languages_supported || [],
 
     classification:req.body.classification,
   
})
await book.save()
console.log('New article created:', book)
user.books.push(book._id)
console.log('User book before saving:', user.books);
await user.save()
res.status(201).json({ message: 'Book created  successfully', book:book

});

} catch (error) {
console.error(error); 

res.status(500).json({ message: 'Error creating article', error });

}
}