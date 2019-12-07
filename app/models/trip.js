module.exports = function (sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        date: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.STRING
        },
        regUrl: {
            type: DataTypes.STRING,
        },
        userTrip: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Trip.associate = function (models) {
        Trip.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Trip;
};
