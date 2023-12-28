function ChatMessage(Sequelize, DataTypes) {
  return Sequelize.define(
    'chatmessage',
    {
      ms_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      u_idx: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      r_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      c_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      c_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      tableName: 'chatmessage',
      freezeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = ChatMessage;
