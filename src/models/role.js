import mongoose, { Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: [{ type: mongoose.Schema.ObjectId, ref: 'Permission' }],
});

roleSchema.plugin(mongooseUniqueValidator, { message: 'already exists' });

const Role = mongoose.model('Role', roleSchema);
export default Role;
