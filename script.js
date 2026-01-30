// 강의 데이터 저장 (로컬 스토리지 사용)
let courses = JSON.parse(localStorage.getItem('courses')) || [];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeSchedule();
    displayCourses();
    document.getElementById('courseForm').addEventListener('submit', addCourse);
});

// 시간표 초기화 (빈 테이블 생성)
function initializeSchedule() {
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.innerHTML = '';

    // 9:00부터 17:00까지 30분 단위로 시간 슬롯 생성 (8교시까지)
    const times = [];
    for (let hour = 9; hour < 17; hour++) {
        times.push(`${String(hour).padStart(2, '0')}:00`);
        times.push(`${String(hour).padStart(2, '0')}:30`);
    }

    times.forEach(time => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${time}</td>`;

        // 월~금 5개 열 추가
        for (let day = 0; day < 5; day++) {
            const cell = document.createElement('td');
            cell.id = `slot-${day}-${time}`;
            row.appendChild(cell);
        }

        scheduleTable.appendChild(row);
    });

    // 시간표에 강의 표시
    refreshScheduleDisplay();
}

// 시간표 화면 새로고침
function refreshScheduleDisplay() {
    // 기존 내용 초기화
    const allCells = document.querySelectorAll('[id^="slot-"]');
    allCells.forEach(cell => {
        cell.innerHTML = '';
    });

    // 각 강의를 시간표에 배치
    courses.forEach((course, index) => {
        const startTime = course.startTime;
        const day = course.day;
        const duration = course.duration;

        // 시작 시간 인덱스 찾기
        const times = [];
        for (let hour = 9; hour < 17; hour++) {
            times.push(`${String(hour).padStart(2, '0')}:00`);
            times.push(`${String(hour).padStart(2, '0')}:30`);
        }

        const startIndex = times.indexOf(startTime);
        if (startIndex === -1) return;

        // 수업 시간에 따라 몇 칸을 차지하는지 계산 (30분 = 1칸)
        const slots = Math.ceil(duration / 30);

        // 해당 칸들에 강의명 표시
        for (let i = 0; i < slots; i++) {
            const timeSlot = times[startIndex + i];
            const cellId = `slot-${day}-${timeSlot}`;
            const cell = document.getElementById(cellId);

            if (cell) {
                // 첫 번째 칸에만 강의명 전체 표시
                if (i === 0) {
                    const courseDiv = document.createElement('div');
                    courseDiv.className = 'time-slot';
                    courseDiv.innerHTML = `
                        <strong>${course.name}</strong><br>
                        <span style="font-size: 0.8em;">${course.classroom}</span>
                    `;
                    courseDiv.style.cursor = 'pointer';
                    courseDiv.onclick = () => deleteCourseByIndex(index);
                    cell.appendChild(courseDiv);
                } else {
                    // 나머지 칸은 연장 표시
                    const extDiv = document.createElement('div');
                    extDiv.className = 'time-slot';
                    extDiv.style.opacity = '0.6';
                    extDiv.innerHTML = `<span style="font-size: 0.75em;">↓</span>`;
                    cell.appendChild(extDiv);
                }
            }
        }
    });
}

// 강의 추가 함수
function addCourse(event) {
    event.preventDefault();

    const courseName = document.getElementById('courseName').value.trim();
    const classroom = document.getElementById('classroom').value.trim();
    const day = document.getElementById('day').value;
    const startTime = document.getElementById('startTime').value;
    const duration = parseInt(document.getElementById('duration').value);

    if (!courseName || !classroom || !day || !startTime || !duration) {
        alert('모든 항목을 입력해주세요!');
        return;
    }

    // 새 강의 객체 생성
    const newCourse = {
        id: Date.now(),
        name: courseName,
        classroom: classroom,
        day: parseInt(day),
        dayName: ['월', '화', '수', '목', '금'][parseInt(day)],
        startTime: startTime,
        duration: duration
    };

    // 강의 배열에 추가
    courses.push(newCourse);

    // 로컬 스토리지에 저장
    localStorage.setItem('courses', JSON.stringify(courses));

    // 폼 초기화
    document.getElementById('courseForm').reset();

    // 화면 업데이트
    displayCourses();
    refreshScheduleDisplay();

    alert(`"${courseName}" 강의가 추가되었습니다!`);
}

// 강의 목록 표시
function displayCourses() {
    const coursesContainer = document.getElementById('courses');
    coursesContainer.innerHTML = '';

    if (courses.length === 0) {
        coursesContainer.innerHTML = '<p style="color: #b39ddb; text-align: center;">등록된 강의가 없습니다.</p>';
        return;
    }

    courses.forEach((course, index) => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <div class="course-item-info">
                <div class="course-item-name">${course.name}</div>
                <div class="course-item-detail">
                    ${course.dayName} ${course.startTime} ~ ${calculateEndTime(course.startTime, course.duration)}<br>
                    ${course.classroom}
                </div>
            </div>
            <button type="button" class="btn-delete" onclick="deleteCourseByIndex(${index})">삭제</button>
        `;
        coursesContainer.appendChild(courseItem);
    });
}

// 강의 삭제 함수
function deleteCourseByIndex(index) {
    const confirmDelete = confirm('이 강의를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const courseName = courses[index].name;
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));

    displayCourses();
    refreshScheduleDisplay();

    alert(`"${courseName}" 강의가 삭제되었습니다!`);
}

// 종료 시간 계산 함수
function calculateEndTime(startTime, durationMinutes) {
    const [hour, minute] = startTime.split(':').map(Number);
    const totalMinutes = hour * 60 + minute + durationMinutes;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
}
