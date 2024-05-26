from flask import Flask, request, jsonify
import threading
import time
import uuid

app = Flask(__name__)

# Dictionary to store the status and results of file processing
processing_status = {}

def process_file(file, task_id):
    # Simulate file processing
    progress_log = []
    # progress_log.append(f"Starting process")
    
    for i in range(1, 6):
        time.sleep(2)  # Simulate a time-consuming task
        progress_log.append(f"Step {i} completed")
        processing_status[task_id]['log'] = progress_log
    
    # Final result after processing
    result = {"message": "File processed successfully", "file_name": file.filename}
    processing_status[task_id]['status'] = 'completed'
    processing_status[task_id]['result'] = result

@app.route('/upload', methods=['POST'])
def upload_file():
    
    print('received')
    
    print(request.files)
    
    if 'file' not in request.files:
        print("No file part")
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    task_id = str(uuid.uuid4())
    processing_status[task_id] = {
        'status': 'processing',
        'log': [],
        'result': None
    }
    
    # Start file processing in a separate thread
    thread = threading.Thread(target=process_file, args=(file, task_id))
    thread.start()
    
    return jsonify({"task_id": task_id}), 202

@app.route('/progress/<task_id>', methods=['GET'])
def get_progress(task_id):
    if task_id not in processing_status:
        return jsonify({"error": "Invalid task ID"}), 404
    
    progress_info = {
        "status": processing_status[task_id]['status'],
        "log": processing_status[task_id]['log']
    }
    return jsonify(progress_info)

@app.route('/result/<task_id>', methods=['GET'])
def get_result(task_id):
    if task_id not in processing_status:
        return jsonify({"error": "Invalid task ID"}), 404
    
    if processing_status[task_id]['status'] != 'completed':
        return jsonify({"error": "Processing not completed"}), 202
    # print(processing_status[task_id]['result'])
    return jsonify(processing_status[task_id]['result'])

if __name__ == '__main__':
    app.run(debug=True)
