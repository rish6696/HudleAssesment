import { DataType } from "sequelize";

interface entityInterface {
  type: DataType;
  allowNull: boolean;
  unique: boolean;
}

export const defineEntity = (
  type: DataType,
  allowNull: boolean,
  unique: boolean
): entityInterface => {
  let entity = <entityInterface>{ allowNull: false, unique: false };
  entity["type"] = type;
  if (allowNull) entity.allowNull = true;
  if (unique) entity.unique = true;
  return entity;
};
