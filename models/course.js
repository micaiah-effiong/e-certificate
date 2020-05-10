module.exports = function(sequelize, DataType){
	let course = sequelize.define('course', {
		courseName: {
			type: DataType.ENUM,
			values: ['GD', 'WD', 'PR', 'DM']
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