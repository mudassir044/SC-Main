document.addEventListener('DOMContentLoaded', function () {

    const salarySlider = document.getElementById('salary-slider');
    const salaryValue = document.getElementById('salary-value');
    const priceDisplay = document.getElementById('billed-price');
    const roleSelect = document.getElementById('role-select')
    const subRoleButtons = document.getElementById('sub-role-buttons');
      const checkboxButtons = document.querySelectorAll('input[name="add-on"]');


    const subRoles = {
        'customer-support': [
            'Technical Support', 'Healthcare Support', 'Email Support', 'Chat Support', 'Customer Care'
        ],
        'tech-support': [
            'Developers', 'QA Engineers', 'Programmers', 'DevOps Engineers', 'UI/UX Designers'
        ],
        'virtual-assistance': [
            'Admin Assistance', 'Personal Assistance', 'Scheduling Assistance', 'Data Entry Assistance', 'Social Media Assistance'
        ]
    };

        function generateSubRoleButtons(role){
            subRoleButtons.innerHTML = '';
            subRoles[role].forEach(subRole => {
                const button = document.createElement('button');
                button.textContent = subRole;
                button.dataset.subRole = subRole;
                button.classList.add('sub-role-button');
                subRoleButtons.appendChild(button)
            });

            // Initial activation logic for first element
            const buttons =  document.querySelectorAll('.sub-role-button');
            if(buttons.length > 0){
                buttons[0].classList.add('active');
            }

            buttons.forEach(button =>{
                button.addEventListener('click', function(){
                   buttons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    calculatePrice();
                })
            })
        }


    function calculatePrice(){
        const sliderValue = parseFloat(salarySlider.value);
        const selectedSubRole = document.querySelector('.sub-role-buttons .active')?.dataset.subRole;
         const roleSelected = roleSelect.value;
         let addOnCost = 0;
        const checkedAddOns = Array.from(checkboxButtons).filter(input => input.checked).map(input => input.value);

         let price = 0;

        if(roleSelected === 'customer-support'){
            if (selectedSubRole === 'Technical Support' || selectedSubRole === 'Healthcare Support' || selectedSubRole === 'Email Support' || selectedSubRole === 'Chat Support' || selectedSubRole === 'Customer Care'  ) {
                price = (sliderValue * 0.25) + (sliderValue*0.05);
            }
        }else if(roleSelected === 'tech-support'){
            if (selectedSubRole === 'Developers' || selectedSubRole === 'QA Engineers' || selectedSubRole === 'Programmers' || selectedSubRole === 'DevOps Engineers' || selectedSubRole === 'UI/UX Designers' ) {
                price = (sliderValue * 0.30) + (sliderValue*0.05);
            }
        } else{
            if (selectedSubRole === 'Admin Assistance' || selectedSubRole === 'Personal Assistance' || selectedSubRole === 'Scheduling Assistance' || selectedSubRole === 'Data Entry Assistance' || selectedSubRole === 'Social Media Assistance' ) {
                price = (sliderValue * 0.33) + (sliderValue*0.05);
            }
        }

          if(checkedAddOns.includes('management')){
              addOnCost += 200;
          }
           if(checkedAddOns.includes('priority')){
               addOnCost += 100;
            }
            if(checkedAddOns.includes('reporting')){
                addOnCost += 50;
            }

        priceDisplay.textContent = Math.floor(price + addOnCost).toLocaleString();
    }


      salarySlider.addEventListener('input', function () {
           salaryValue.textContent = `$${parseInt(this.value).toLocaleString()}`;
          calculatePrice()
    });

   roleSelect.addEventListener('change', function (){
        generateSubRoleButtons(this.value)
         calculatePrice()
    })
    checkboxButtons.forEach(checkbox =>{
          checkbox.addEventListener('change', calculatePrice)
    })

    generateSubRoleButtons(roleSelect.value)
   calculatePrice()
});