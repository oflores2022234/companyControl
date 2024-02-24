import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "The name is obligatory"],
  },
  correo: {
    type: String,
    required: [true, "The email is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is obligatory"],
  },
  role: {
    type: String,
    default: "ADMIN_ROLE"
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function(){
  const { __v, password, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}

export default mongoose.model('User', UserSchema);