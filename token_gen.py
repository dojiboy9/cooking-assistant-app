import subprocess

def get_tts():
    cmd = "curl -u bb56accc-4a44-4ff1-8544-c3220f5c5730:rbWV0zC3aiMB https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/text-to-speech/api"
    args = cmd.split()
    process = subprocess.Popen(args, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout

def get_stt():
    cmd = "curl -u d4bd560c-2ca5-4d2c-8f3e-8b04cbf9cdf7:cDBlvUeIBKUE https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api"
    args = cmd.split()
    process = subprocess.Popen(args, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    return stdout

print 'tts_key = "' + get_tts() + '"'
print ''
print 'stt_key = "' + get_stt() + '"'
