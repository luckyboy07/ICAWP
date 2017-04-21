'use strict';

var JobsCategoriesArray = [{
    description: 'Accounting / Finance',
    value: 'accounting_finance',
    subcategory: [{
        description: 'Accountant',
        value: '178'
    }, {
        description: 'Auditor',
        value: '177'
    }, {
        description: 'Bookkeeper',
        value: '176'
    }, {
        description: 'Call Center / BPO',
        value: '80'
    }, {
        description: 'CPA',
        value: '81'
    }, {
        description: 'Finance / Banking',
        value: '179'
    }, {
        description: 'Payroll',
        value: '83'
    }, {
        description: 'Virtual / Home-based',
        value: '82'
    }]
}, {
    description: 'Admin / Office / Clerical',
    value: 'admin_office_clerical',
    subcategory: [{
        description: 'Admin / Data Entry',
        value: '87'
    }, {
        description: 'Operations',
        value: '188'
    }, {
        description: 'Secretary / Receptionist',
        value: '86'
    }, {
        description: 'Virtual / Home-based',
        value: '85'
    }]
}, {
    description: 'Agriculture / Veterinary',
    value: 'agriculture_veterinary'
}, {
    description: 'Airline / Airport',
    value: 'Airline_Airport'
}, {
    description: 'Arts / Media / Design',
    value: 'arts_media_design',
    subcategory: [{
        description: 'CAD',
        value: '90'
    }, {
        description: 'Fashion',
        value: '193'
    }, {
        description: 'Graphic Design / Web',
        value: '91'
    }, {
        description: 'Interior Design',
        value: '89'
    }, {
        description: 'Radio / Music',
        value: '92'
    }, {
        description: 'Video / TV',
        value: '93'
    }, {
        description: 'Writers',
        value: '94'
    }, {
        description: 'Virtual / Home-based',
        value: '95'
    }]
}, {
    description: 'Call Center / BPO',
    value: 'call_center_bpo'
}, {
    description: 'Domestic / Caretaker',
    value: 'Domestic_Caretaker'
}, {
    description: 'Education / Schools',
    value: 'education_schools'
}, {
    description: 'Engineering / Architecture',
    value: 'engineering_architecture',
    subcategory: [{
        description: 'Administration',
        value: '125'
    }, {
        description: 'Architecture',
        value: '126'
    }, {
        description: 'CAD',
        value: '127'
    }, {
        description: 'Chemical Engineering',
        value: '175'
    }, {
        description: 'Civil Engineering',
        value: '128'
    }, {
        description: 'Computer Engineering',
        value: '129'
    }, {
        description: 'ECE',
        value: '165'
    }, {
        description: 'Electrical Engineering',
        value: '130'
    }, {
        description: 'Industrial Engineering',
        value: '131'
    }, {
        description: 'Interior Design',
        value: '132'
    }, {
        description: 'Maritime',
        value: '139'
    }, {
        description: 'Mechanical Engineering',
        value: '133'
    }, {
        description: 'QA / QC',
        value: '134'
    }, {
        description: 'Safety',
        value: '135'
    }, {
        description: 'Sales Engineer',
        value: '136'
    }, {
        description: 'Virtual / Home-based',
        value: '137'
    }]
}, {
    description: 'Food / Restaurant',
    value: 'food_restaurant'
}, {
    description: 'Foreign Language',
    value: 'foreign_language_jobs'
}, {
    description: 'Government / Non-profit',
    value: 'govt_non_profit'
}, {
    description: 'Health / Medical / Science',
    value: 'health_medical_science',
    subcategory: [{
        description: 'Call Center / BPO',
        value: '148'
    }, {
        description: 'Dental',
        value: '184'
    }, {
        description: 'Doctor',
        value: '150'
    }, {
        description: 'Hospital Admin',
        value: '158'
    }, {
        description: 'Laboratory',
        value: '183'
    }, {
        description: 'Med Tech',
        value: '156'
    }, {
        description: 'Nurse / Midwife',
        value: '149'
    }, {
        description: 'Pharmacist',
        value: '151'
    }, {
        description: 'PT / OT',
        value: '153'
    }, {
        description: 'Rad Tech',
        value: '155'
    }, {
        description: 'Sales',
        value: '152'
    }, {
        description: 'Transcriptionist',
        value: '181'
    }, {
        description: 'Veterinarian',
        value: '154'
    }]
}, {
    description: 'Hotel / Spa / Salon',
    value: 'hrm_tourism',
    subcategory: [{
        description: 'Corporate Sales / Mktg',
        value: '159'
    }, {
        description: 'Hotel / Resort',
        value: '160'
    }, {
        description: 'Salon',
        value: '161'
    }, {
        description: 'Spa',
        value: '162'
    }]
}, {
    description: 'HR / Recruitment / Training',
    value: 'hr_recruitment_training',
    subcategory: [{
        description: 'HR Admin',
        value: '169'
    }]
}, {
    description: 'IT / Computers',
    value: 'it',
    subcategory: [{
        description: 'Database',
        value: '64'
    }, {
        description: 'Design',
        value: '68'
    }, {
        description: 'Mobile Dev',
        value: '70'
    }, {
        description: 'Network / Sys Admin',
        value: '66'
    }, {
        description: 'Operations / HR',
        value: '63'
    }, {
        description: 'Programming / Dev',
        value: '62'
    }, {
        description: 'QA / Testing',
        value: '166'
    }, {
        description: 'Sales',
        value: '65'
    }, {
        description: 'SEO / Online Marketing',
        value: '61'
    }, {
        description: 'Tech Support',
        value: '67'
    }, {
        description: 'Technical Writer',
        value: '168'
    }, {
        description: 'Technician',
        value: '164'
    }, {
        description: 'Virtual / Home-based',
        value: '69'
    }]
}, {
    description: 'Legal / Documentation',
    value: 'legal_documentation'
}, {
    description: 'Logistics / Warehousing',
    value: 'logistics_warehousing'
}, {
    description: 'Maritime / Seabased',
    value: 'maritime_seabased'
}, {
    description: 'Production / Manufacturing',
    value: 'production_manufacturing'
}, {
    description: 'Purchasing / Buyer',
    value: 'purchasing'
}, {
    description: 'Sales / Marketing / Retail',
    value: 'sales_marketing_retail',
    subcategory: [{
        description: 'Call Center / BPO',
        value: '78'
    }, {
        description: 'Corporate Sales',
        value: '74'
    }, {
        description: 'Customer Service',
        value: '167'
    }, {
        description: 'Events',
        value: '191'
    }, {
        description: 'Field Sales',
        value: '76'
    }, {
        description: 'Insurance',
        value: '192'
    }, {
        description: 'Marketing / Advertising',
        value: '75'
    }, {
        description: 'Online Marketing',
        value: '77'
    }, {
        description: 'Real Estate',
        value: '190'
    }, {
        description: 'Retail / Store',
        value: '73'
    }, {
        description: 'Telemarketing',
        value: '72'
    }]
}, {
    description: 'Skilled Work / Technical',
    value: 'skilled_work_technical',
    subcategory: [{
        description: 'Automotive / Mechanical',
        value: '113'
    }, {
        description: 'Construction / Carpentry',
        value: '114'
    }, {
        description: 'Driver - 4 wheel',
        value: '112'
    }, {
        description: 'Driver - Truck',
        value: '121'
    }, {
        description: 'Electrical',
        value: '115'
    }, {
        description: 'Heavy Equipment',
        value: '116'
    }, {
        description: 'Machine Operators',
        value: '117'
    }, {
        description: 'Motorcycle Rider',
        value: '118'
    }, {
        description: 'Oil / Gas / Mining',
        value: '174'
    }, {
        description: 'Painter',
        value: '119'
    }, {
        description: 'Technician',
        value: '120'
    }, {
        description: 'Utility / Janitor',
        value: '122'
    }, {
        description: 'Welding',
        value: '123'
    }]
}, {
    description: 'Sports / Athletics',
    value: 'sports_athletics'
}, {
    description: 'Internship',
    value: 'internship'
}, {
    description: 'Others',
    value: 'others'
}, {
    description: 'Job Fairs',
    value: 'jobfair'
}];

module.exports = function(mongoose) {
    var JobsCategories = mongoose.model('JobsCategories');
    JobsCategories.collection.drop();
    JobsCategories.create(JobsCategoriesArray);
};
