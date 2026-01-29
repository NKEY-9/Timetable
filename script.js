// 강의 데이터를 저장하는 배열
let courses = [];
let currentInterval = 60; // 기본값: 60분(1시간)

// localStorage 키 정의
const STORAGE_KEY = 'university_timetable_courses';
const INTERVAL_KEY = 'university_timetable_interval';

// localStorage에서 데이터 로드
function loadCoursesFromStorage() {
    const savedCourses = localStorage.getItem(STORAGE_KEY);
    if (savedCourses) {
        courses = JSON.parse(savedCourses);
    }
}

// localStorage에서 시간 간격 로드
function loadIntervalFromStorage() {
    const savedInterval = localStorage.getItem(INTERVAL_KEY);
    if (savedInterval) {
        currentInterval = parseInt(savedInterval);
        document.getElementById('interval').value = savedInterval;
    }
}

// 데이터를 localStorage에 저장
function saveCourcesToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

// 시간 간격을 localStorage에 저장
function saveIntervalToStorage() {
    localStorage.setItem(INTERVAL_KEY, currentInterval);
}

// 모든 데이터 초기화 함수
function clearAllData() {
    if (confirm('모든 저장된 강의 데이터가 삭제됩니다. 계속하시겠습니까?')) {
        courses = [];
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(INTERVAL_KEY);
        currentInterval = 60;
        document.getElementById('interval').value = '60';
        updateTimetable();
        alert('데이터가 초기화되었습니다.');
    }
}

// 시간 포맷팅 함수
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// 시간을 분 단위로 변환
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

// 강의 추가 함수
function addCourse() {
    const courseName = document.getElementById('courseName').value.trim();
    const classroom = document.getElementById('classroom').value.trim();
    const professor = document.getElementById('professor').value.trim();
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const isMajor = document.getElementById('isMajor').checked;

    // 입력값 검증
    if (!courseName || !classroom || !professor || !startTime || !endTime) {
        alert('모든 항목을 입력해주세요.');
        return;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes >= endMinutes) {
        alert('시작 시간이 종료 시간보다 작아야 합니다.');
        return;
    }

    // 새 강의 추가
    const course = {
        id: Date.now(),
        name: courseName,
        classroom: classroom,
        professor: professor,
        startTime: startMinutes,
        endTime: endMinutes,
        isMajor: isMajor
    };

    courses.push(course);

    // 입력값 초기화
    document.getElementById('courseName').value = '';
    document.getElementById('classroom').value = '';
    document.getElementById('professor').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('isMajor').checked = false;

    // localStorage에 저장
    saveCourcesToStorage();

    // 시간표 업데이트
    updateTimetable();
}

// 강의 삭제 함수
function deleteCourse(id) {
    courses = courses.filter(course => course.id !== id);
    // localStorage에 저장
    saveCourcesToStorage();
    updateTimetable();
}

// 시간표 업데이트 함수
function updateTimetable() {
    const intervalSelect = document.getElementById('interval');
    currentInterval = parseInt(intervalSelect.value);

    // localStorage에 시간 간격 저장
    saveIntervalToStorage();

    renderTimetable();
    renderCourseList();
}

// 시간표 렌더링 함수
function renderTimetable() {
    const tbody = document.getElementById('timetableBody');
    tbody.innerHTML = '';

    // 9:00 (540분)부터 17:00 (1020분)까지
    const startHour = 9 * 60; // 9:00
    const endHour = 17 * 60; // 17:00

    for (let time = startHour; time < endHour; time += currentInterval) {
        const row = document.createElement('tr');

        // 시간 셀
        const timeCell = document.createElement('td');
        timeCell.className = 'time-cell';
        timeCell.textContent = formatTime(time);
        row.appendChild(timeCell);

        // 요일별 셀 (월-금)
        for (let day = 0; day < 5; day++) {
            const dayCell = document.createElement('td');
            dayCell.className = 'course-cell';

            // 해당 시간에 겹치는 강의 찾기
            const coursesInCell = courses.filter(course => {
                const nextTime = time + currentInterval;
                return course.startTime < nextTime && course.endTime > time;
            });

            // 강의 정보 표시
            coursesInCell.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course-item-table' + (course.isMajor ? ' major' : '');
                courseDiv.innerHTML = `<strong>${course.name}</strong><br>${course.classroom}`;
                dayCell.appendChild(courseDiv);
            });

            row.appendChild(dayCell);
        }

        tbody.appendChild(row);
    }
}

// 강의 목록 렌더링 함수
function renderCourseList() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';

    if (courses.length === 0) {
        courseList.innerHTML = '<p style="text-align: center; color: #999;">등록된 강의가 없습니다.</p>';
        return;
    }

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card' + (course.isMajor ? ' major' : '');

        const startTimeStr = formatTime(course.startTime);
        const endTimeStr = formatTime(course.endTime);

        card.innerHTML = `
            <button class="delete-btn" onclick="deleteCourse(${course.id})">삭제</button>
            <h3>${course.name}</h3>
            <div class="course-info">
                <div><strong>강의실:</strong> ${course.classroom}</div>
                <div><strong>교수:</strong> ${course.professor}</div>
                <div><strong>시간:</strong> ${startTimeStr} ~ ${endTimeStr}</div>
            </div>
            ${course.isMajor ? '<div class="major-badge">전공과목</div>' : ''}
        `;

        courseList.appendChild(card);
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // localStorage에서 저장된 데이터 로드
    loadCoursesFromStorage();
    loadIntervalFromStorage();
    updateTimetable();
});
