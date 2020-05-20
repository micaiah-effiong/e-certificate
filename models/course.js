module.exports = function(sequelize, DataType){
	let course = sequelize.define('course', {
		courseCode: {
			type: DataType.ENUM,
			values: ['GD', 'WD', 'PR', 'DM'],
			valitade:{
				len: [2]
			}
		},
		courseName: {
			type: DataType.STRING
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

	// class methods
	course.getCourseNameFromCourseCode = (code)=>{
		return courses[code];
	}

	return course;
}

let courses = {
	DM: "Digital Marketing",
	GD: "Graphics Design",
	PR: "Programming",
	WD: "Web Development"
}