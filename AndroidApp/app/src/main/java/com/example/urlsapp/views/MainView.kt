import androidx.lifecycle.*

// ViewModel for managing data and business logic
class MainView : ViewModel() {
    // Storing the entered value
    private val _inputValue = MutableLiveData<String>()

    // Public field for observing from the activity
    val result: LiveData<String> = Transformations.map(_inputValue) { "Entered value: $it" }

    // Setting the entered value
    fun setInputValue(value: String) {
        _inputValue.value = value
    }
}
