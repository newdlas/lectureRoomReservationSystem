# -- coding: utf-8 --


from flask import Flask, json, request, session, \
    redirect, url_for, make_response, jsonify, abort, render_template
from flask_cors import CORS
from flask_json import FlaskJSON, JsonError, json_response
import pymysql
from operator import eq

app = Flask(__name__)
CORS(app)

myNum = 0

@app.route('/student', methods=['GET'])
def main() :
    return render_template('resv.html')

@app.route('/', methods=['GET'])
@app.route('/admin', methods=['POST', 'GET'])
def adminAccsess() :
    return render_template('index.html')



@app.route('/notice', methods=['GET'])
def noticeView() :
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select * from notice"
    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows)
    return data

@app.route('/noticeAdd', methods=['POST', 'GET'])
def noticeAddFunc() :
    value = request.get_json(force=True)
#    value = {
#        "계정": "ID1234",
#        "작성자": "으어어",
#        "제목": "시험용이야",
#        "내용": "그런건없어"
#    }

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select DATE_FORMAT(now(), '%Y-%m-%d %H:%i:%s');"
    curs.execute(sql)
    time = curs.fetchall()
    time = str(time)
    time = time[3:22]

    sql = "insert into notice(Id, account,name,head,content, time) \
     values(%s, %s, %s, %s, %s, str_to_date(%s,'%%Y-%%m-%%d %%H:%%i:%%s'));"
    curs.execute(sql, ('null', value['계정'], value['작성자'], value['제목'], value['내용'], time))
    conn.commit()
    conn.close()
    return 'OK'


@app.route('/noticeDel', methods=['POST','GET'])
def noticeDelfunc() :
    value = request.get_json(force=True)
#    value = {
#        "Id": "6"
#    }

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup', db='lacture', charset='utf8')
    curs = conn.cursor()

    sql = "delete from notice \
    where Id = %s "
    curs.execute(sql, (value['Id']))
    conn.commit()
    conn.close()

    return "OK"

@app.route('/standBy', methods=['GET'])
def standByReservation() :
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()

    # SQL문 실행
    sql = "SELECT userNumber, lectureNumber, purpose, \
    dateDay ,startTime, finishTime, theNumber, explanation \
    FROM reservation \
    where state = '승인대기';"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data

@app.route('/theDay', methods=['GET'])
def theDayReservation() :
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "SELECT s.name, s.phoneNumber, r.lectureNumber, r.purpose, \
    r.startTime, r.finishTime, r.theNumber, r.dateDay \
    FROM student_info s, reservation r \
    where r.state='승인완료' and r.dateDay = curdate() and s.userNumber = r.userNumber;"

    # 데이타 Fetch

    curs.execute(sql)
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data


@app.route('/lactureView', methods=['GET'])
def view() :
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "SELECT lectureNumber, location, capacity, lectureDesk, projecter, audioSystem, studentComputer, form \
    from lecture_info;"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    #print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows)
    return data

@app.route('/classroomAdd', methods=['POST'])
def Add() :
   value = request.get_json(force=True)
   conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                          db='lacture', charset='utf8')

   # Connection 으로부터 Cursor 생성
   # SQL문 실행
   try :
       with conn.cursor() as curs :
           sql = "select lactuerNumber \
                   from digital_building"
           curs.execute(sql)
           rows = curs.fetchall()
           length = len(rows)

           for i in range(1, length+1) :
               sql = "select lactuerNumber \
                     from digital_building \
                     where id =" + str(i) + ";"
               curs.execute(sql)
               result = curs.fetchall()
               result = str(result)
               valueStr = str(value['호실'])
               if eq(valueStr, result[3:7]) :
                   print("중복진입")
                   data = json.dumps("false", indent=4, sort_keys=True, default=str)
                   return data

           sql = "insert into lecture_info(Id,lectureNumber,lectureName,location,capacity,lectureDesk,projecter,audioSystem\
               ,studentComputer, form) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
           curs.execute(sql, ('null', value['호실'], value['이름'], value['위치'], value['정원'], value['전자교탁'],
                                  value['프로젝터'], value['음향시설'], value['학생용컴퓨터'], value['형식']))
           sql = "insert into digital_building(Id, lactuerNumber) values(%s,%s)"
           curs.execute(sql, ('null', value['호실']))
       conn.commit()
   finally :
       conn.close()
       data = json.dumps("true", indent=4, sort_keys=True, default=str)
       return data
    #페이지 새로고침은 스크립트에서 다시 페이지를 렌더링할 수 있도록 함

@app.route('/digital_time', methods=['GET'])
def digital():
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "SELECT l.lectureNumber, l.lectureName, l.capacity \
        FROM digital_building d, lecture_info l \
        where l.lectureNumber = d.lactuerNumber;"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows)
    return data

@app.route('/tech_time', methods=['GET'])
def tech():
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "SELECT l.lectureNumber, l.lectureName, l.capacity \
        FROM Tech_building t, lecture_info l \
        where l.lectureNumber = t.lactuerNumber;"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows)
    return data

@app.route('/global_time', methods=['GET'])
def global_():
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "SELECT l.lectureNumber, l.lectureName, l.capacity \
        FROM global_building g, lecture_info l \
        where l.lectureNumber = g.lactuerNumber;"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    # print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows)
    return data

@app.route('/reservationAdd', methods=['POST'])
def reservationAdd():
    value = request.get_json(force=True)

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    try:
        with conn.cursor() as curs:
            sql ="insert into reservation(Id, lectureNumber,theNumber,dateDay,startTime,finishTime,purpose,crew,userNumber\
           ,explanation, state) values(%s, %s, %s, str_to_date(%s, '%%Y-%%m-%%d'),  str_to_date(%s, '%%H:%%i:%%s'),  \
           str_to_date(%s, '%%H:%%i:%%s'), %s, %s, %s, %s, %s)"

            curs.execute(sql, ('null', value['강의실'],  value['인원'], value['날짜'], value['시작시간'], value['종료시간'],
                               value['목적'], value['단체'], value['학번'], value['설명'], '승인대기'))
        conn.commit()
    finally:
            conn.close()

    return 'OK'

@app.route('/getMyNumber', methods=['POST', 'GET'])
def myNumber():
    global myNum
    global dataNum
    value = request.get_json(force=True)

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    print(value['dummy'])
    # SQL문 실행
    sql = "select  dateDay, startTime, finishTime, theNumber, purpose\
          from reservation  \
          where userNumber = " + value['학번'] + ";"
    print(sql)
    myNum = value['학번']
    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)

    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)

    return data

@app.route('/myReservation', methods=['GET'])
def myResv():
    global myNum
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select  dateDay, startTime, finishTime, theNumber, purpose, state, lectureNumber\
              from reservation \
              where userNumber = " + myNum + ";"

    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    # print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data

@app.route('/reservationDetail', methods=['POST', 'GET'])
def detail():
    value = request.get_json(force=True)
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select  r.dateDay, r.startTime, r.finishTime, s.name, s.userNumber,s.phoneNumber, r.theNumber, \
          r.purpose, r.lectureNumber, r.crew, r.explanation\
             from reservation r, student_info s  \
             where s.userNumber = " + value['학번'] + ";"
    curs.execute(sql)
    # 데이타 Fetch
    rows = curs.fetchall()
    print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data

@app.route('/classroomManage', methods=['GET'])
def manage() :
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select lectureNumber, location, capacity, lectureDesk, projecter, audioSystem, studentComputer, form \
            from lecture_info;"

    # 데이타 Fetch

    curs.execute(sql)
    rows = curs.fetchall()
    #print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data

@app.route('/timeTable/<lectureNumber>', methods=['GET'])
def time(lectureNumber) :

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup',
                           db='lacture', charset='utf8')

    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 실행
    sql = "select lactureNumber, day, time, subject, startDate, finishDate \
           from timetable  \
            where '" + lectureNumber+ "' = lactureNumber;"

    # 데이타 Fetch

    curs.execute(sql)
    rows = curs.fetchall()
    # print(rows)
    # Connection 닫기
    conn.close()
    data = json.dumps(rows, indent=4, sort_keys=True, default=str)
    return data

@app.route('/permission', methods=['POST'])
def permissionFunction() :
    value = request.get_json(force=True)
#    value = {
#        "학번": "20000001",
#        "시작시간": "11:00:00",
#        "종료시간": "13:00:00",
#        "강의실": "D229"
#    }
    print(value)
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup', db='lacture', charset='utf8')
    curs = conn.cursor()
    sql = "update reservation \
    set state = '승인완료' \
    where userNumber =%s and startTime = str_to_date(%s, '%%H:%%i:%%s') \
        and finishTime = str_to_date(%s, '%%H:%%i:%%s') and lectureNumber =%s;"

    curs.execute(sql, (value['학번'], value['시작시간'], value['종료시간'], value['강의실']))
    conn.commit()
    conn.close()

    return "OK"

@app.route('/refuse', methods=['POST', 'GET'])
def refuseFunction() :
    value = request.get_json(force=True)
#    value = {
#        "학번": "20010001",
#        "시작시간": "15:00:00",
#        "종료시간": "18:00:00",
#        "강의실": "D1234"
#    }

    conn = pymysql.connect(host='localhost', user='root', password='apmsetup', db='lacture', charset='utf8')
    curs = conn.cursor()


    sql = "delete from reservation \
    where userNumber = %s and startTime = %s and finishTime = %s and lectureNumber = %s"

    curs.execute(sql, (value['학번'], value['시작시간'], value['종료시간'], value['강의실']))
    conn.commit()
    conn.close()

    return "OK"

@app.route('/classModify', methods=['POST', 'GET'])
def modifyFunction() :
    value = request.get_json(force=True)
#    value = {
#        "호실": "D101",
#        "이름": "실습실",
#        "위치": "디지털관 2층",
#        "정원": "100",
#        "전자교탁": "n",
#        "프로젝터": "n",
#        "음향시설": "n",
#        "학생용컴퓨터": "n",
#        "형식": "계단식"
#    }

    print("진행됨")
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup', db='lacture', charset='utf8')
    curs = conn.cursor()
    sql = "update lecture_info \
        set  lectureNumber = %s, lectureName = %s, location = %s, capacity = %s, lectureDesk = %s, \
        projecter = %s, audioSystem = %s, studentComputer = %s, form = %s\
        where lectureNumber =%s;"

    curs.execute(sql, (value['호실'], value['이름'], value['위치'], value['정원'], value['전자교탁'],
                    value['프로젝터'], value['음향시설'], value['학생용컴퓨터'], value['형식'], value['호실']))
    conn.commit()
    conn.close()

    return "OK"


@app.route('/classDel', methods=['POST', 'GET'])
def delFunction():
#    value = request.get_json(force=True)
    value = {
        "호실": "D1234"
    }
    conn = pymysql.connect(host='localhost', user='root', password='apmsetup', db='lacture', charset='utf8')
    curs = conn.cursor()
    sql = "delete from lecture_info where lectureNumber = %s;"

    curs.execute(sql, (value['호실']))
    conn.commit()
    conn.close()

    return "OK"


if __name__ == '__main__' :
    app.debug = True
    app.run(host='0.0.0.0', port=8090)


"""
@app.route('/receive', methods = ['POST'])
def receive():
    data = request.get_json(force=True)
    try:
        value = data['value']

    except (KeyError, TypeError, ValueError):
        raise JsonError(description='Invalid value.')

    print(value)

    return 'OK'

@app.route('/send')
def toClient():
    data = {
        "device": "TemperatureSensor",
        "value": "20",
        "timestamp": "25/01/2017 10:10:05"
    }
    return jsonify(data)
"""