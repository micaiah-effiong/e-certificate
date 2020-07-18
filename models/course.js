module.exports = function (sequelize, DataType) {
	let course = sequelize.define("course", {
		courseName: {
			type: DataType.STRING,
			unique: true,
		},
		description: {
			type: DataType.STRING,
			allowNull: false,
		},
		details: {
			type: DataType.STRING,
		},
		courseDuration: {
			type: DataType.STRING,
			allowNull: false,
		},
	});

	// class methods
	course.getCourseNameFromCourseCode = (code) => {
		return courses[code];
	};

	return course;
};
