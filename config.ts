import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://malik:12345@mapwork.ccggic9.mongodb.net/?retryWrites=true&w=majority'
    //   {
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    //     //   useCreateIndex: true,
    //   }
    );
    console.log(`MONGODB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
