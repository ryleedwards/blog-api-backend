import mongoose, { Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const permissionSchema = new Schema({
  name: { type: String, required: true },
});

permissionSchema.plugin(mongooseUniqueValidator, { message: 'already exists' });

const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;
