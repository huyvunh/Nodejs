const firestoreDB = require('../../config/database/firestoreDatabase/firestore');
const moment = require('moment-timezone');

exports.renderHomePage = (req, res, next) => {
    return res.render("index", { time: Date.now() });
};


exports.renderAboutPage = (req, res, next) => {
    return res.render("about");
};


exports.createStudent = async (req, res, next) => {

    let body = req.body;
    console.log(body)
    const name = body['name'], age = parseInt(body['age']), nameOfClass = body['nameOfClass'];

    try {

        const currentDate = moment.tz(new Date(), 'Asia/Ho_Chi_Minh').unix();
        const currentCreatedAt = moment.unix(currentDate).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY HH:mm:ss',)
        const id = 'STU-' + currentDate;
        let newStudent = {
            id: id,
            name: name,
            age: age,
            nameOfClass: nameOfClass,
            createdAt: currentCreatedAt,
            createdAtTimestmap: currentDate
        }
        await firestoreDB.collection('Students').doc(id).set(newStudent);

        return res.status(200).json({
            status: 200, message: 'Create User Success!'
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
};

exports.getDataStudent = async (req, res, next) => {
    let body = req.body;

    try {

        const students = await firestoreDB.collection('Students');
        const dataStudents = await students
            .where('age', '>=', 18)
            .get();

        console.log(dataStudents)
        let listData = [];
        if (!dataStudents.empty) {
            dataStudents.forEach(doc => {
                const stu = doc.data();
                listData.push(stu)
            });
        }

        return res.status(200).json({
            status: 200, message: 'Create User Success!',
            data: listData
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}


exports.getStudentById = async (req, res, next) => {
    let body = req.body;
    const id = body['id']

    try {
        //fromDate , toDate

        const students = firestoreDB.collection('Students');
        const dataStudents = await students
            //  .where('id', '==', id)
            // .where('createdAtTimestmap', '>=', fromDate)
            // .where('createdAtTimestmap', '<=', toDate)
            .get();
        // const dataStudents = await students
        //     .where('age', '>=', 18)
        //     .get();


        const student = dataStudents.docs[0].data();

        return res.status(200).json({
            status: 200, message: 'Create User Success!',
            data: student
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}

//Sửa , Xóa dữ liệu
//Tìm danh sách học sinh lớn 17 và nhỏ 22
// Tìm danh sách học sinh được tạo theo ngày tháng fromDate và toDate
