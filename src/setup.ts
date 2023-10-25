import {Ref, ref} from "vue";

export let setupIsOpen = ref(false);

export let stepValue = ref(1);

export let eventName  = ref('Job');

export let setupList = ref<any[]>([]);

export let maxValue: Ref <number> = ref(100);