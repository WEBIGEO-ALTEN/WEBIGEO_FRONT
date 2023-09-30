pipeline {
    agent {
        label 'Front_End'
    }
    environment {
        DOCKER_IMAGE = "my_react"
        DOCKER_TAG = "front_test"
        DOCKER_FRONT = "Front_Container"
    }
    stages {

        stage("Clean the containers"){
            steps{
                script{
                    def container = sh(script: 'docker ps',returnStdout: true).trim()

                    echo "This is the output : ${container}"

                    if (container.contains(env.DOCKER_FRONT)){
                        sh "docker stop $DOCKER_FRONT"
                        sh "docker rm $DOCKER_FRONT"
                        sh "docker rmi $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                    else{
                        echo "The container is clean"
                    }
                }
            }
        }

        stage("Front End image") {
            steps {
                script {
                    //sh "docker stop $DOCKER_FRONT"
                    //sh "docker rm $DOCKER_FRONT"
                    echo "Building Docker image: $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f Dockerfile . "//--no-cache
                }
            }
        }

        stage("Docker run the image") {
            steps {
                script {
                    echo "Running Docker container: $DOCKER_FRONT"
                    sh "docker run -d -p 3020:3000 --name $DOCKER_FRONT $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker ps"
                }
            }
        }

        
        stage("Testing the containers") {
            steps {
                script {
                    def serveripaddress = "4.236.153.248"
                    def containerId = sh(script: "docker ps -qf name=$DOCKER_FRONT", returnStdout: true).trim()
                


                    def url = "http://${serveripaddress}:3020"

                    echo "Testing application at $url"
                    
                    // Use 'timeout' to prevent 'curl' from running indefinitely
                    def response = sh(script: "timeout 30 curl -i $url", returnStatus: true)
                    echo "${response}"
                    if (response != 0) {
                        error "HTTP request to $url failed, check the URL and try again."
                    } else {
                        def statusCode = sh(script: "curl -s -o /dev/null -w '%{http_code}' $url", returnStatus: true)
                        echo"This is the test case : ${statusCode}"    
                        if (statusCode == 0) {
                            echo "HTTP request to $url was successful. Status code: $statusCode"
                        } else {
                            error "HTTP request to $url failed with status code $statusCode"
                        }
                    }
                }
            }
        }

        stage('Test the app'){
            steps{
                script{
                    def tapp = sh(script: "docker exec -d $DOCKER_FRONT npm run test >> result.txt && echo \$?", returnStatus: true).trim()

                    sleep(time: 60,unit: 'SECONDS')
                    
                    sh "docker cp $containeId:/path/to/your/result.txt ."

                     // Display the contents of result.txt
                    def catResult readFile('result.txt').trim()
                    echo "Contents of result.txt: $catResult"

                    def result = sh(script: 'cat result.txt | grep -i pass || true', returnStatus: true)
                    if (result == 0){
                        echo "result of the test: $result"                        
                    } else {
                        error "The test has not passed: $result"
                    }
                }
            }
        }
        
        stage('Pushing Back End image to DockerHub') {
            environment
            {
                DOCKER_PASS = credentials("DOCKER_HUB_PASS") 
            }

            steps {

                script {
                sh '''
                echo "docker login -u $DOCKER_ID -p $DOCKER_PASS"
                docker login -u $DOCKER_ID -p "yP?5Q>Ktp+YA%#_"
                docker push $DOCKER_ID/$DOCKER_BACK_IMAGE:$DOCKER_TAG_TEST
                '''
                }
            }
        }
        /*/    
        stage("Removing the container and Image") {
            steps {
                script {
                    echo "Stopping and removing Docker container: $DOCKER_FRONT"
                    sh "docker stop $DOCKER_FRONT"
                    sh "docker rm $DOCKER_FRONT"
                    echo "Removing Docker image: $DOCKER_IMAGE:$DOCKER_TAG"
                    sh "docker rmi $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }

        stage("Invoking another pipeline") {
            steps {
                echo "Triggering another pipeline job"
                build job: 'WEBIGEO', parameters: [string(name: 'param1', value: "value1")], wait: true
            }

        /*/
        stage("Invoking another pipeline") {
            steps {
                script {
                    def main_pipeline = build job: 'WEBIGEO_CI_CD', parameters: [
                        booleanParam(name: 'Docker_Build_Back_End_Image', value: true),
                        booleanParam(name: 'Pushing_the_Back_End_image_to_DockerHub', value: true),
                        booleanParam(name: 'Deployment_in_webigeo', value: true)
                    ]
                    main_pipeline.waitForCompletion("Waiting for the WEBIGEO pipeline to complete")
                }
            }
        }

        stage("End") {
            steps {
                echo "Bye"
            }
        }
    }
}
