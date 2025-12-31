// ===============================
// script.js
// ===============================

// ===== بنك الكلمات =====
const wordSources = {
    animals: ["أسد", "كلب", "قطة", "فيل", "زرافة"],
    colors: ["أحمر", "أزرق", "أخضر", "أصفر"],
    games: ["كرة", "شطرنج", "سباق"],
    jobs: ["طبيب", "مهندس", "مدرس"],
    numbers: ["واحد", "اثنان", "ثلاثة"],
    letters: ["أ", "ب", "ت", "ث"]
};



function generateCategory(words, count) {
    const result = [];
    let i = 1;

    while (result.length < count) {
        for (let w of words) {
            if (result.length >= count) break;
            result.push(w + "_" + i);
        }
        i++;
    }
    return result;
}

const wordBank = {
    animals: generateCategory(wordSources.animals, 10000),
    colors: generateCategory(wordSources.colors, 8000),
    games: generateCategory(wordSources.games, 6000),
    jobs: generateCategory(wordSources.jobs, 7000),
    numbers: generateCategory(wordSources.numbers, 3000),
    letters: generateCategory(wordSources.letters, 2000)
};
// ===== نهاية بنك الكلمات =====


// =======================================
// كل منطق الصفحة يبدأ من هنا
// =======================================
document.addEventListener('DOMContentLoaded', () => {

    const activeStudentId = localStorage.getItem('activeStudentId');
    const path = window.location.pathname;

    // =================================================
    // 1. الصفحات المسموح فتحها بدون طالب
    // =================================================
    const isPublicPage =
        path.includes('login.html') ||
        path.includes('account_switcher.html') ||
        path.includes('settings.html') ||
        path === '/';

    // =================================================
    // 2. فحص تسجيل الدخول
    // =================================================
    if (!isPublicPage && !activeStudentId) {
        alert('يجب اختيار طالب أو تسجيل الدخول أولاً.');
        window.location.href = 'login.html';
        return;
    }

    // =================================================
    // 3. أزرار الشريط الجانبي
    // =================================================

    // دخول ولي الأمر
    const parentLoginLink = document.getElementById('parent-login-link');
    if (parentLoginLink) {
        parentLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'account_switcher.html?action=parentlogin';
        });
    }

    // تسجيل خروج الطالب
    const logoutStudentLink = document.getElementById('logout-student-link');
    if (logoutStudentLink) {
        logoutStudentLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('هل أنت متأكد من تسجيل خروج الطالب الحالي؟')) {
                localStorage.removeItem('activeStudentId');
                alert('تم تسجيل خروج الطالب بنجاح.');
                window.location.href = 'account_switcher.html';
            }
        });
    }

    // =================================================
    // 4. تطبيق الإعدادات العامة
    // =================================================
    const applySettings = () => {
        const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
        if (settings.fontSize) {
            document.body.style.fontSize =
                settings.fontSize === 'small' ? '14px' :
                settings.fontSize === 'large' ? '20px' :
                '16px';
        }
    };
    applySettings();

    // =================================================
    // 5. تجربة بنك الكلمات (كلمة عشوائية)
    // =================================================
    const randomAnimal =
        wordBank.animals[Math.floor(Math.random() * wordBank.animals.length)];

    console.log("كلمة عشوائية من بنك الكلمات:", randomAnimal);

})



