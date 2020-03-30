module.exports = function(sequelize, DataType){
	let course = sequelize.define('course', {
		courseName: {
			type: DataType.STRING,
		},
		courseDuration: {
			type: DataType.STRING,
			allowNull: false
		},
		completed: {
			type: DataType.BOOLEAN,
			defaultValue : false
		},
		dateCompleted: {
			type: DataType.DATE,
			allowNull: true
		}
	});
	return course;
}