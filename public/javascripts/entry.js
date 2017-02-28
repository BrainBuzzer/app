var app = new Vue({
	el: '#form',
	data: {
		m_type: 'a',
		options: [
			{ text: 'झोपडी व मातीचे घर', value: 'a'},
			{ text: 'दगड किंवा विटा वापरलेली मातीची इमारत', value: 'b'},
			{ text: 'दगड, विटाची व चुना किंवा सिमेंट वापरून उभारलेली इमारत', value: 'c'},
			{ text: 'आर.सी.सी. पद्धतीचे घर', value: 'd'},
			{ text: 'खुल्ली जमीन', value: 'e'},
			{ text: 'मनोरा', value: 'f'}
		],
		yes_no_options: [
			{ text: 'हो', value: 'yes'},
			{ text: 'नाही', value: 'no'}
		],
		first_floor_yn: 'no',
		second_floor_yn: 'no',
		name: '',
		pupa: '1',
		daut: '0'
	}
})