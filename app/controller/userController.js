const path = require('path');
const Decimal = require('decimal.js') //npm i decimal.js
const moment = require('moment-timezone') //npm i moment-timezone

exports.getUserInfo = (req, res, next) => {
    return res.status(200).json({
        isSuccess: true,
        status: 200,
        data: 'Hello World!!'
    });
}

function validateRequire(input) {
    console.log(input)
    return input !== undefined && input !== '' && input !== null
}

exports.createUser = (req, res, next) => {
    let body = req.body;
    console.log(body)
    const username = body['username'], //Kiểu String
        pasword = body['password'],
        age = parseInt(body['age']), //Kiểu Interger
        diemtoan = parseFloat(body['diemtoan']), //Kiểu Float

        isAdmin = Boolean(body['isAdmin']), //Kiểu Boolean - true/false

        member = body['member'];  //Undefined

    const array = [
        {
            id: 1,
            name: "Vu",
            age: 21,
        },
        {
            id: 1,
            name: "Thy",
            age: 21
        }
    ];

    const arr = [1, 23, 34, 56]
    //console.log(array[0].name)
    console.log('NHHV', arr.filter(x => x < 40))

    const optionalFields = [username, pasword];


    if (
        typeof isAdmin !== 'boolean' ||
        optionalFields.some(field => !validateRequire(field))
    ) {
        return res.status(200).json({
            isSuccess: true,
            status: 400,
            message: 'Something wrong!'
        });
    }

    //console.log(array.length)

    //console.log(age + 2)

    //const demo = "i don't go home"
    //const demo2 = `i am ${age} years old` //để truyền dữ liệu
    //const demo3 = String(JSON.stringify(`i am \\\\`)) //vì 2 \\ chỉ tính là \ khi dùng để đường dẫn
    //console.log(demo3)
    //console.log(demo, demo2, demo3)


    return res.status(200).json({
        isSuccess: true,
        status: 400,
        data: {
            username: username,
            pasword: pasword
        }
    });
}

exports.demo = (req, res, next) => {
    //let username = filter(username)

    const array = [
        {
            id: 1,
            name: "Thy",
            age: 21,
        },
        {
            id: 2,
            name: "Vu",
            age: 21,


        },
        {
            id: 3,
            name: "Huy",
            age: 23
        },
        {
            id: 4,
            name: "Tuan",
            age: 24
        }
    ];
    const array2 = [
        {
            id: 1,
            diemtoan: 3,
            diemVan: 5
        },
        {
            id: 2,
            diemtoan: 4,
            diemVan: 3
        }
    ];

    // const newArray = array.map((item1) => {
    //     const item2 = array2.find((elem) => elem.id === item1.id);
    //     if (item2) {
    //         return { ...item1, ...item2 };
    //     }
    //     return item1;
    // });
    // const newArray = array.map((item1) => {
    //     const item2 = array2.find((item2) => item2.id === item1.id);
    //     if (item2) {
    //         item1.diemso = item2;
    //     }
    //     return item1;
    // });

    // console.log(newArray);







    //let dùng trong vòng lặp
    //const thì ngoài vòng lặp



    // const demo = array.find(function (x) {
    //     return x.id === 1; //so sánh tuyệt đối, cùng kiểu dữ liệu

    // })

    // const demo2 = array.filter(y => y.age == 21)[1]
    // //console.log(demo);
    // //console.log(demo2);

    // const demo3 = array.sort(function (y, z) { //Sắp xếp
    //     return z.age - y.age;

    // })
    // //console.log(demo3);

    // const demo4 = array.push({
    //     id: 5,
    //     name: "Truong",
    //     age: 27,
    // })

    // //Var không cần khai báo lại
    // // var u = [];
    // // const demo5 = array.forEach(function (y) {
    // //     // y.id == 1;
    // //     let v = y.id;
    // //     if (v == 1) {
    // //         u.push(y)
    // //     }

    // // })
    // // console.log(u);
    // // var u = [];
    // // for (let i = 0; i < array.length; i++) {
    // //     const element = array[i];
    // //     if (element.id == 1){
    // //         u.push(element)
    // //     }

    // // }

    // // console.log(u);
    // var u = [];
    // for (const iterator of array) {
    //     if (iterator.id == 1) {
    //         u.push(iterator)
    //     }
    // }

    //console.log(u);
    //console.log(array);
    return res.status(200).json({
        isSuccess: true,
        status: 200,
        data: 'Hello World!!'
    });

}


//Mảng phần tử trong mạng bắt đầu từ 0 

exports.demoABC = (req, res, next) =>{

    let body = req.body;
    const startDate = body.startDate, toDate = body.toDate;
    // console.log(a, b)



    try{
        




        // console.log(parseFloat(new Decimal(0.2).plus(0.1)).toFixed(8))


        // const tong = Number(parseFloat(new Decimal(a).plus(b)).toFixed(8));
        // console.log(tong)


        // // console.log(parseFloat(new Decimal(0.2).plus(0.1)).toFixed(8) + 'abc') //ra String
        // // console.log(parseFloat(new Decimal(0.2).plus(0.1)).toFixed(8) + 23.213) //ra String

        // const hieu = Number(parseFloat(new Decimal(a).minus(b)).toFixed(8));
        // console.log(hieu)

        // const tich = Number(parseFloat(new Decimal(a).times(b)).toFixed(8));
        // console.log(tich)

        // const thuong = Number(parseFloat(new Decimal(a).dividedBy(b)).toFixed(8));
        // console.log(thuong)

        // const abc = Number(parseFloat(new Decimal(a).dividedBy(b).plus(2).minus(100)).toFixed(8));
        // console.log(abc)

        // const now = new Date().getTime() //UTC+7 //cos getTime sẽ ra con số
        // console.log(now)

        // const now = new Date('09/20/2023'); //MM/DD/YYYY HH:mm:ss
        // console.log(now)
        
        // const now = parseInt(new Date().getTime() / 1000);
        // const result = moment.unix(now).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY HH:mm:ss'); //unix phải truyển 1 number vào; timestamp phải là số
        
        var array = [
            {
                id: 1,
                amount: 100,
                timestamp: 1695224903,
                createdAt:'09/20/2023' //20/09/2023
            },
            {
                id: 2,
                amount: 200,
                timestamp: 1695138503,
                createdAt:'09/19/2023' //19/09/2023
            },
            {
                id: 3,
                amount: 200,
                timestamp: 1695052103,
                createdAt:'09/18/2023' //18/09/2023
            },
        ]



        // const fromDate = '09/18/2023'
        // const toDate = '09/19/2023'
        //filter từ fromDate (18) và toDate (19) làm sao để lấy được id2,3
        
        //         startDate <= timestamp <= endDate


        const start = moment.tz(startDate, 'MM/DD/YYYY','UTC').toDate();
        const to = moment.tz(toDate, 'MM/DD/YYYY', 'UTC').toDate();

        // console.log(start, to)
        
        array = array.filter(x => 
            
            moment.unix(x.timestamp).tz('UTC').toDate() >= start &&
            moment.unix(x.timestamp).tz('UTC').toDate() <= to

        )
        console.log(array)

        // const start = moment.tz(startDate, 'MM/DD/YYYY','Asia/Ho_Chi_Minh').unix(); //chuyển MM/DD/YYYY thành timestamp Integer
        // const to = moment.tz(toDate, 'MM/DD/YYYY','Asia/Ho_Chi_Minh').unix(); //chuyển MM/DD/YYYY thành timestamp Integer

        // array = array.filter(x => 
            
        //     parseInt(new Date(moment.unix(x.timestamp).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY')).getTime() / 1000) >= start &&
        //     parseInt(new Date(moment.unix(x.timestamp).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY')).getTime() / 1000) <= to
    
        // )
        // console.log(array)

        // const start = moment.tz(startDate, 'MM/DD/YYYY','UTC').toDate();
        // const to = moment.tz(toDate, 'MM/DD/YYYY','UTC').toDate();
        // array = array.filter(x => 
            
        //     moment.tz(x.createdAt, 'MM/DD/YYYY','UTC').toDate() >= start &&
        //     moment.tz(x.createdAt, 'MM/DD/YYYY','UTC').toDate() <= to
    
        // )
        // console.log(array)








        // var index = 0
        // const inter = setInterval(() => {
        // setInterval(() => {
        //     index +=1
        //     const now = parseInt(new Date().getTime() / 1000); //timestamp
        //     const result = moment.unix(now).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY HH:mm:ss');
        //     console.log(result)
        //     // if(index == 10) //Tới 10 số sẽ dừng
        //     //     clearInterval();
        // }, 1000);
        
        
        







        return res.status(200).json({
            isSuccess: true 
        })

    } catch(error){
        return res.status(400).json({
            isSuccess: false,
            data: error
        });
    }
}